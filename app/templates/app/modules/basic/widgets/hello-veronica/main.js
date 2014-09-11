define([
    'text!./templates/main.html',
    'css!./styles/main.css'
], function (tpl) {
    return function (options) {
        var app = options.sandbox.app;

        var View = app.view.define({
            template: tpl
        });

        return new View(options);
    };
});
