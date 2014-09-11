// requirejs
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory();
        });
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ReqConfig = factory();
    }
}(this, function () {

    return function (prefixPath) {
        var framePath = './vendor';
        return {
            debug: true,
            paths: {
                'underscore': framePath + '/underscore/underscore',
                'jquery': framePath + '/jquery/jquery',
                'eventemitter': framePath + '/eventemitter2/lib/eventemitter2',

                'text': framePath + '/requirejs-text/text',
                'css': framePath + '/require-css/css',
                'normalize': framePath + '/require-css/normalize',
                'css-builder': framePath + '/require-css/css-builder'
            },
            shim: {
                'underscore': { 'exports': '_' },
                'jquery': { 'exports': 'jquery' }
            },
            packages: [{
                name: 'veronica',
                location: framePath + '/veronica/lib'
            }]
        };
    }

}));
