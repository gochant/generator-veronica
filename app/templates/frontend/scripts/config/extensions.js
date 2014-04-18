// 配置要使用的扩展
define(function (require) {
    return function(app, Application) {
        require('../extensions/ext-layout')(app, Application);
        require('../extensions/ext-router')(app);
        require('../extensions/ext-lang')(app);
        require('../extensions/ext-notify')(app);
    };
})