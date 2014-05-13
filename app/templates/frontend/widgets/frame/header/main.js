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
            subscribe: function () {
                var me = this;
                sandbox.on('pageLoaded', function (pageName) {
                    me.$('.active').removeClass('active');
                    me.$('a[href="#page/' + pageName + '"]').closest('li').addClass('active');
                });
            }
        });

        return new View(options);
    };
});