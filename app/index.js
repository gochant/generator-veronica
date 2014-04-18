'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var VeronicaSpaGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');
        //  this.reqConf = require(this.pkg.publish.config)();

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });

        this.copyDir = function (dir, files) {
            for (var i = 0, len = files.length; i < len; i++) {
                var file = files[i];
                this.template(dir + '/' + file, dir + '/' + file);
            }
        }
    },

    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        // this.log(this.yeoman);

        this.log(chalk.magenta('欢迎使用 VeronicaSpa 生成器.'));

        var prompts = [{
            name: 'appName',
            message: '您的应用名称是什么?'
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            done();
        }.bind(this));
    },

    app: function () {
        this.template('Gruntfile.js', 'Gruntfile.js');
        this.template('_package.json', 'package.json');
    },
    createDirLayout: function () {
        this.mkdir('frontend');
        this.template('frontend/index.html', 'frontend/index.html');

        this.mkdir('frontend/pages');

        this.mkdir('frontend/styles');
        this.copy('frontend/styles/index.less', 'frontend/styles/index.less');
        this.copy('frontend/styles/index.css', 'frontend/styles/index.css');

        this.mkdir('frontend/widgets');

        this.mkdir('frontend/scripts');
        this.template('frontend/scripts/app.js', 'frontend/scripts/app.js');
        this.template('frontend/scripts/main.js', 'frontend/scripts/main.js');

        this.mkdir('frontend/scripts/config');
        this.copyDir('frontend/scripts/config', ['extensions.js', 'require-conf.js', 'subpages.js']);

        this.mkdir('frontend/scripts/extensions');
        this.copyDir('frontend/scripts/extensions', ['ext-lang.js', 'ext-layout.js', 'ext-notify.js', 'ext-router.js']);

        this.mkdir('frontend/scripts/layouts');
        this.copyDir('frontend/scripts/layouts', ['default.html', 'scaffold.html']);

        this.mkdir('frontend/scripts/subpages');
        this.copyDir('frontend/scripts/subpages', ['_common.js', 'default.js', 'home.js']);

    },
    projectfiles: function () {
        this.copy('bowerrc', '.bowerrc');
        this.template('_bower.json', 'bower.json');
        this.copy('gitignore', '.gitignore');
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = VeronicaSpaGenerator;