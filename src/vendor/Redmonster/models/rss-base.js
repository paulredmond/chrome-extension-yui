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
            dateStr: {
                value: ''
            },
            pubDate: {
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
        
        parse: function (response) {
            var self = this,
                items = response.responseXML.getElementsByTagName('item'),
                data = [],
                months = "January February March April May June July August September October November December".split(" ");
                
            for (var i = 0; i < items.length; i++) {
                var item = items[i],
                    pubDate = item.getElementsByTagName('pubDate')[0].textContent;
                    date = new Date(pubDate);
                    
                self.add({
                    title: item.getElementsByTagName('title')[0].textContent,
                    description: item.getElementsByTagName('description')[0].textContent,
                    permalink: item.getElementsByTagName('link')[0].textContent,
                    dateStr: months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
                    pubDate: date
                });
            }

            return self;
        }
    };
    
}, "1.0.0", { requires: ["io", "model", "model-list"] });