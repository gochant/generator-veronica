
requirejs(['./config/require-conf'], function (conf) {

    // requirejs 配置
    requirejs.config(conf());

    requirejs(['app']);

})
