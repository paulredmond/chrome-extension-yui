YUI.applyConfig({
    groups: {
        models: {
            base: '/vendor/Redmonster/models/',
            root: 'vendor/Redmonster/models/',
            modules: {
                "rss-base": {
                    path: "rss-base.js",
                    requires: ["io", "model", "model-list"]
                },
                "options": {
                    path: "options.js",
                    requires: ["model", "model-list"]
                }
            }
        }
    }
});