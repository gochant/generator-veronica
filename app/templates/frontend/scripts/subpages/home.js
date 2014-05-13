define(function () {
    return {
        'home': {
            name: '主页',
            widgets: [{
                name: 'jumbotron',
                options: {
                    _source: 'business',
                    host: '#content2'
                }
            }, {
                name: 'marketing',
                options: {
                    _source: 'business',
                    host: '#content3'
                }
            }],
            inherit: ['_common']
        },
        'about': {
            name: '关于',
            layout: 'simple',
            widgets: [{
                name: 'about',
                options: {
                    _source: 'business',
                    host: '#content'
                }
            }],
            inherit: ['_common']
        },
        'contact': {
            name: '联系我',
            layout: 'simple',
            widgets: [{
                name: 'contact',
                options: {
                    _source: 'business',
                    host: '#content'
                }
            }],
            inherit: ['_common']
        }
    };
})