define([
    'text!./templates/main.html',
    'css!./styles/main.css'
], function (tpl) {

    return function (options) {
        var sandbox = options.sandbox;
        var app = sandbox.app;
        var $ = app.core.$;
        var _ = app.core._;

        var View = app.view.define({
            template: tpl
        });

        return new View(options);
    };
});
