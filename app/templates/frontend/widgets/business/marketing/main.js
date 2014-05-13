define([
    'text!./templates/index.html'
], function (tpl) {

    return function (options) {
        var app = options.sandbox.app;
        var sandbox = options.sandbox;
        var $ = app.core.$;
        var _ = app.core._;

        var View = app.mvc.baseView({
            template: tpl,
            className: 'row'
        });

        return new View(options);
    };
});