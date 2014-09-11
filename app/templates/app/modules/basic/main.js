// requirejs
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            './config/subpages',
            './config/extensions',
            './config/layouts'
        ], function (pages, extensions, layouts) {
            return factory(pages, extensions, layouts);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ReqConfig = factory();
    }
}(this, function (pages, extensions, layouts) {

    return function (mod, app) {
        mod.addExtension(extensions);
        mod.addPage(pages);
        mod.addLayout(layouts);
    }
}));
