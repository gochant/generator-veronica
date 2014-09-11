'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var WidgetsGenerator = yeoman.generators.NamedBase.extend({
    init: function () {
        console.log('create widget： ' + this.name + '.');
    },

    files: function () {
        this.mkdir(this.name);
        this.mkdir(this.name + '/styles');
        this.mkdir(this.name + '/templates');
        this.template('templates/main.html', this.name + '/templates/main.html');
        this.template('styles/main.less', this.name + '/styles/main.less');
        this.template('styles/main.css', this.name + '/styles/main.css');
        this.template('main.js', this.name + '/main.js');
    }
});

module.exports = WidgetsGenerator;
