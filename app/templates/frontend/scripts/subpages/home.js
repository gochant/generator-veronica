define(function () {
    return {
        'home': {
            name: '主页',
            widgets: [{
                name: 'hello-veronica',
                options: {
                    _source: 'business',
                    host: '#main'
                }
            }],
            inherit: ['_common']
        }
    };
})