/**
 * Base RSS model functionality
 *
 * Extend these models to build object-oriented results from RSS data.
 * Provides:
 *   Y.RssBase.ItemModel
 *   Y.RssBase.List
 * 
 * @author Paul Redmond
 * @link http://goredmonster.com
 */
YUI.add("rss-base", function (Y) {
    
    var Rss = Y.namespace("RssBase");

    /**
     * Base RSS Item model
     * 
     * Represents one RSS feed item.
     */
    Rss.ItemModel = Y.Base.create('rss-item-model', Y.Model, [], {
    }, {
        ATTRS: {
            title: {
                value: ''
            },
            description: {
                value: ''
            },
            permalink: {
                value: ''
            },
            date: {
                value: ''
            }
        }
    });
    
    /**
     * Rss List
     *
     * Base model list houses multiple feed items.
     */
    Rss.List = function () {};
    
    Rss.List.API_ORIGIN = 'http://www.sheknows.com';
    
    Rss.List.prototype = {
        
        model: Rss.ItemModel,
        
        endpointUrl: '/',
        
        buildUrl: function() {
            return this.endpointUrl;
        },
        
        sync: function (action, options, callback) {
            Y.Lang.isFunction(callback) || (callback = function () {});
            
            if (action !== 'read') {
                return callback('Read-only');
            }
            
            var url = this.buildUrl();
            
            Y.io(Rss.List.API_ORIGIN + url, {
                method: 'GET',
                on: {
                    complete: function (id, response) {                    
                        if (response.status >= 200 && response.status < 300) {
                            callback(null, response);
                        }
                    }
                }
            });
        },

        /**
         * Parse the XML response and normalize with DataSchema.
         *
         * If the response object doesn't contain responseXML, uses DataType to attempt to parse string.
         *
         * @param response
         * @return {*}
         */
        parse: function (response) {
            var self = this,
                xml = response.responseXML || Y.DataType.XML.parse(response.responseText),
                schema,
                data;

            schema = {
                metaFields: {
                    title: "//channel/title",
                    link: "//channel/link",
                    description: "//channel/description",
                    language: "//channel/language"
                },
                resultListLocator: 'item',
                resultFields: [
                    {
                        locator: 'title',
                        key: 'title'
                    },
                    {
                        locator: 'description',
                        key: 'description'
                    },
                    {
                        locator: 'permalink',
                        key: 'permalink'
                    },
                    {
                        locator: 'pubDate',
                        key: 'date'
                    }
                ]
            };

            data = Y.DataSchema.XML.apply(schema, xml);
            self.add(data.results);

            //@todo Maybe set meta fields?

            return self;
        }
    };
    
}, "1.0.0", { requires: ["io", "model", "model-list", "datatype", "dataschema"] });