/**
 * Base options model
 * 
 * Used to house application options that are persisted with localstorage.
 */
 
YUI.add('options', function (Y) {
    
    var Chrome = Y.namespace('Options');
    
    Chrome.OptionModel = Y.Base.create('option-model', Y.Model, [], {
        idAttribute: 'name',
        
        sync: function (action, options, callback) {
            var data,
                name = this.get('name');
            
            switch (action) {
                case 'create':
                    data = this.toJSON();
                    var options = Y.JSON.parse(localstorage.getItem('options')) || {};
                    options[name] = data;
                    localStorage.setItem('options', Y.JSON.stringify(options));
                    callback(null, data);
                break;
                case 'read':
                    data = Y.JSON.parse(localStorage.getItem('options'));
                    
                    if (data) {
                        callback(null, data[name] || []);
                    }
                    
                    return;
                break;
                case 'update':
                    data = this.toJSON();
                    
                    var options = Y.JSON.parse(localStorage.getItem('options')) || {};
                    options[name] = data;
                    localStorage.setItem('options', Y.JSON.stringify(options));
                    callback(null, data);
                break;
                case 'delete':
                    var options = Y.JSON.parse(localStorage.getItem('options'));
                    delete options[name];
                    localStorage.setItem('options', Y.JSON.stringify(options));
                    callback();
                break;
                default:
                    callback('Invalid action');
                break;
            }
            
            return;
        }
    },
    {
        ATTRS: {
            name: {
                value: ''
            },
            value: {
                value: ''
            }
        }
    });
    
    Chrome.OptionCollection = Y.Base.create('option-collection', Y.ModelList, [], {         
        
        /**
         * Retrieve list of options, populate.
         */
        sync: function (action, options, callback) {
            var data;
            
            switch (action) {
                case 'read':
                    data = Y.JSON.parse(localStorage.getItem('options'));
                    
                    // @todo Loop through object and set up options as model instances.
                    
                    if (data) {
                        this.set('options', data);
                        callback(null, data);
                    }
                    
                    return;
                break;
                default:
                    callback('Invalid action');
                break;
            }
            
            return;
        }
    }, {
        ATTRS: {
            options: {
                value: {}
            }
        }
    });
    
}, "1.0.0", { requires: ["model", "model-list"] });