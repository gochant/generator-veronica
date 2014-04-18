define([
    'text!./templates/index.html',
    'css!./styles/index.css'
], function (tpl) {

    return function (options) {
        var app = options.sandbox.app;
        var sandbox = options.sandbox;
        var $ = app.core.$;
        var _ = app.core._;

        var View = app.mvc.baseView({
            template: tpl
        });

        return new View(options);
    };
});