'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var WidgetsGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('创建插件： ' + this.name + '.');
  },

  files: function () {
      this.mkdir(this.name);
      this.mkdir(this.name + '/styles');
      this.mkdir(this.name + '/templates');
      this.template('templates/index.html', this.name + '/templates/index.html');
      this.template('styles/index.less', this.name + '/styles/index.less');
      this.template('styles/index.css', this.name + '/styles/index.css');
      this.template('main.js', this.name + '/main.js');
  }
});

module.exports = WidgetsGenerator;