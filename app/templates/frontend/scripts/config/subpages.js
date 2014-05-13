// ����Ҫʹ�õ�ҳ��
define(function (require) {
    var _ = require('underscore');
    return _.extend({},
        require('../subpages/_common'),
        require('../subpages/default'),
        require('../subpages/home')
        );
})