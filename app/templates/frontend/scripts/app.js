define([
    'veronica',
    './config/subpages',
    './config/extensions',
    './config/layouts'
], function (core, pages, extension, layouts) {

    var app = core.createApp('<%= _.slugify(appName) %>', {
        autoReport: true
    });

    app.use('veronica-mvc');

    app.start().done(function () {

        if (app.core.getConfig().controls) {
            app.core.registerWidgets(app.core.getConfig().controls);
        }

        app.ext(extension);
        app.addPage(pages);
        app.addLayout(layouts);

        app.sandbox.on('appStarted.' + app.name, function () {
            $('#global-loading').remove();
        });

        app.startPage();
    });
});