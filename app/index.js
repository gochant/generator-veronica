'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var VeronicaGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

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

        this.log(chalk.magenta('Welcome to use veronica generator.'));

        var prompts = [{
            name: 'appName',
            message: 'What is your application name?'
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
        this.mkdir('app');
        this.template('app/index.html', 'app/index.html');

        this.mkdir('app/pages');

        this.directory('app/styles', 'app/styles');

        this.template('app/main.js', 'app/main.js');
        this.copy('app/require-conf.js', 'app/require-conf.js');

        this.directory('app/modules', 'app/modules');

    },
    projectfiles: function () {
        this.copy('bowerrc', '.bowerrc');
        this.template('_bower.json', 'bower.json');
        this.copy('gitignore', '.gitignore');
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = VeronicaGenerator;
