
requirejs(['./require-conf'], function (conf) {

    // requirejs 配置
    requirejs.config(conf());

    requirejs(['veronica'], function (veronica) {
        var app = veronica.createApp({
            modules: [{
                name: 'basic',
                source: './modules'
            }],
            defaultPage: 'home',
            homePage: 'home'
        });

        app.launch().done(function () {
            app.page.start(true);
        });
    });

})
