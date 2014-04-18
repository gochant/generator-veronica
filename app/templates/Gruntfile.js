'use strict';

module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var _ = require('underscore');
    var path = require('path');
    var reqConf = require(pkg.publish.config)();
    var emptyPaths = {};

    _.each(reqConf.paths, function (item, name) {
        if (!_.contains(['text', 'css', 'normalize', 'css-builder'], name)) {
            emptyPaths[name] = 'empty:';
        }
    });

    _.each(reqConf.packages, function (item, name) {
        emptyPaths[item.name] = 'empty:';
    });

    var controlsPath = {};
    _.each(reqConf.controls, function (control) {
        control = control.split('@')[0];
        controlsPath[control] = 'empty:';
        controlsPath[control + '/main'] = control + '/main';
        controlsPath[control + '/styles'] = control + '/styles';
        controlsPath[control + '/views'] = control + '/views';
        controlsPath[control + '/templates'] = control + '/templates';
    });

    // ��ȡ����Ŀ¼�µ�ģ�飨��ǰԴ·��������Դ·����
    var getModules = function (opt, widgets) {

        if (!opt) {
            return [];
        }
        var source = opt.source || grunt.option('source');
        var fs = require('fs');
        var dirs = fs.readdirSync(source);

        var subSource = [];
        _.each(widgets, function (sr) {
            var idx = sr.source.indexOf(opt.source);
            if (idx >= 0 && opt.source !== sr.source) {
                subSource.push(sr.source.substring(idx + opt.source.length + 1));
            }
        });

        var result = _.map(_.reject(dirs, function (dir) {
            // �ų�������ļ����У����ƺ�������·������
            return _.find(['.css', '.js', '.DS_Store', 'styles'].concat(subSource), function (tag) {
                return dir.indexOf(tag) > -1;
            });
        }), function (dir) {

            return {
                name: dir + '/main',
                exclude: ['text', 'css']
            };
        });
        return result;
    };

    // ��������
    grunt.initConfig({
        // Ԫ����
        pkg: pkg,
        // ��������
        requirejs: {
            site: {
                options: {
                    appDir: reqConf.appDir,
                    baseUrl: reqConf.baseUrl,
                    dir: reqConf.dir,
                    modules: [
                        { name: 'main', include: ['app', 'veronica-mvc'] }
                    ],
                    paths: reqConf.paths,
                    shim: reqConf.shim,
                    packages: reqConf.packages,
                    // optimize: "none",  // uglify
                    optimize: "uglify",
                    uglify: {

                    },
                    removeCombined: true,
                    fileExclusionRegExp: /^\./
                }
            },
            widget: {
                options: {
                    baseUrl: grunt.option('source'), // "./base/ui/widgets"
                    dir: grunt.option('target'), // './base/public/widgets'
                    modules: getModules(),
                    paths: _.extend({}, controlsPath, emptyPaths, grunt.option('path')),
                    shim: reqConf.shim,
                    optimize: "uglify",
                    // optimizeCss: "none",
                    removeCombined: true,
                    fileExclusionRegExp: /^\./,
                    onBuildWrite: function (moduleName, path, contents) {
                        var packageName = moduleName.substring(0, moduleName.indexOf('/main'));
                        return contents + "\ndefine('" + packageName + "', ['" + moduleName + "'], function (main) { return main; })";
                    }

                }
            }
        },

        concat: {
            options: {
                separator: '\n'
            }
        },
        copy: {
            main: {
            }
        },
        clean: {
            // TODO: ����д����һЩ·�����迼��һ�ָ����ŵķ�ʽ
            main: [
                'public/vendor/backbone',
                'public/vendor/eventemitter2',
                'public/vendor/jquery',
                'public/vendor/pnotify',
                'public/vendor/underscore',
                'public/vendor/veronica',
                'public/vendor/veronica-mvc',
                'public/**/*.less',
                'public/**/build.txt',
                'public/scripts/layouts'
            ],
            source: [
                'frontend'
            ]
        },
        css_combo: {
            main: {
                files: {
                    'public/styles/index.css': ['public/styles/index.css']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-css-combo');

    grunt.registerTask('site', ['requirejs:site']);
    // ������������
    grunt.registerTask('widget', ['requirejs:widget']);
    // ������в����
    grunt.registerTask('widgets', function () {
        var widgets = _.map(reqConf.sources, function (item) {
            return {
                source: path.join(reqConf.appDir, reqConf.baseUrl, item),
                target: path.join(reqConf.dir, reqConf.baseUrl, item)
            };
        })

        _.each(widgets, function (opt, i) {
            var modules = getModules(opt, widgets);
            var widgetsPath = {};

            // �������¼����ļ�����ڲ����ļ��е���ȷ·��
            _.each(['text', 'css', 'normalize', 'css-builder'], function (mod) {
                var modPath = reqConf.paths[mod];
                var truthPath = path.join(reqConf.appDir, reqConf.baseUrl, modPath);
                var dep = 10;
                while (truthPath !== path.join(opt.source, modPath) && dep !== 0) {
                    modPath = path.join('../', modPath);
                    dep--;
                }
                widgetsPath[mod] = modPath;
            });
            grunt.config('requirejs.widget' + i, {
                options: _.extend(grunt.config('requirejs.widget.options'), {
                    baseUrl: opt.source,
                    dir: opt.target,
                    paths: _.extend({}, controlsPath, emptyPaths, widgetsPath),
                    modules: modules
                })
            });
            grunt.config('concat.widget' + i, {
                src: [opt.source + '/**/*.css', '!' + opt.source + '/**/*.min.css'],
                dest: opt.target + '/styles/all.css'
            });

            //grunt.config('copy.widget' + i, {
            //    expand: true,
            //    src: opt.source + '/**/images/**',
            //    dest: opt.target + '/images/',
            //    flatten: true,
            //    filter: 'isFile'
            //})

            grunt.config('clean.widget' + i, {
                src: [
                    opt.target + '/**/templates/',
                    opt.target + '/*/**/styles/',
                    opt.target + '/**/build.txt',
                    opt.target + '/**/css.js',
                    opt.target + '/**/css-builder.js',
                    opt.target + '/**/normalize.js',
                    opt.target + '/**/text.js',
                    opt.target + '/*/**/images/'
                ]
            })

            // ѹ����Ŀ¼�����в��
            grunt.task.run('requirejs:widget' + i);
            // �ϲ���Ŀ¼������CSS�ļ��������IE��31����ʽ���������⣩
            grunt.task.run('concat:widget' + i);
            // ����ͼƬ
            // grunt.task.run('copy:widget' + i);
            // ����
            grunt.task.run('clean:widget' + i);

        });
    });

    grunt.registerTask('default', function () {
        grunt.task.run('site');
        grunt.task.run('widgets');
        grunt.task.run('css_combo');
        grunt.task.run('clean:main');
    });

    grunt.registerTask('publish', function () {
        grunt.task.run('default');
        grunt.task.run('clean:source');

    });
};