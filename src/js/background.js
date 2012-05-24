//
// background.js
// Main script that runs in the background
//

// Models
YUI().use("node", "rss-base", "options", function (Y) {
    var Rss = Y.RssBase,
        Options = Y.Options,
        LatestList,
        OptionList;

    LatestList = Y.Base.create('latest-list', Y.ModelList, [Y.RssBase.List], {
        endpointUrl: '/articles/whats-new.rss'
    });

    var test = new LatestList();
    test.load(function (err, response) {
        console.log(test.item(0));
    });
    
    
    // Example options list save...
    OptionList = new Options.OptionCollection({model: Options.OptionModel});
    OptionList.create({name: 'email', value: 'you@yours.com'});
});