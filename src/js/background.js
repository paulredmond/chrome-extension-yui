//
// background.js
// Main script that runs in the background
//

// Models
YUI().use("node", "rss-base", function (Y) {
    var Rss = Y.RssBase,
        LatestList;

    LatestList = Y.Base.create('latest-list', Y.ModelList, [Y.RssBase.List], {
        endpointUrl: '/articles/whats-new.rss'
    });

    var test = new LatestList();
    test.load(function (err, response) {
        console.log(test.item(0));
    });
});