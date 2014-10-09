
'use strict';

module.exports = function (grunt) {

    var reqConf = require('./app/require-conf.js')();

    grunt.initConfig({
        veronica: {
            defaults: {
                options: {
                    appDir: './app',
                    baseUrl: '.',
                    dir: './app-release',
                    reqConfig: reqConf,
                    clean: [],
                    modules: [{
                        name: 'basic',
                        source: './modules'
                    }],
                    removeCombined: true,
                    optimize: {
                        paths: ['!**/build/**/*.js', '!**/test/**/*.js', '!**/*.min.js', '!**/jquery/src/**/*.js']
                    }
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-veronica');
    grunt.registerTask('default', ['veronica']);

};
