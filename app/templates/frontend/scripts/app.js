define([
    'veronica',
    './config/subpages',
    './config/extensions',
    './config/layouts'
], function (core, pages, extensions, layouts) {

    var app = core.createApp('test', {
        autoReport: true
    });

    app.use('veronica-mvc');

    app.launch().done(function () {

        app.core.registerWidgets(app.core.getConfig().controls);

        app.ext(extensions);
        app.addPage(pages);
        app.addLayout(layouts);

        app.sandbox.on('appStarted', function () {
            app.startRouter();
            $('#global-loading').remove();
        });

        app.startPage();
    });
});