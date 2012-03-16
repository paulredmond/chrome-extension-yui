YUI.applyConfig({
    groups: {
        rss: {
            base: '/vendor/Redmonster/models/',
            root: 'vendor/Redmonster/models/',
            modules: {
                "rss-base": {
                    path: "rss-base.js",
                    requires: ["io", "model", "model-list"]
                }
            }
        }
    }
});