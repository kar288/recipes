'use strict';

var path = require('path');


module.exports = function(grunt) {
    // Unified Watch Object
    var watchFiles = {
        serverViews: ['app/views/**/*.*', 'views/*.html'],
        serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js', '!app/tests/'],
        clientViews: ['public/modules/**/views/**/*.html', 'views/*.html'],
        clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
        clientCSS: ['public/modules/**/*.css']
    };

    // Project configuration.
    grunt.initConfig({
        express: {
            all: {
                options: {
                    port: 9000,
                    bases: path.resolve('public'),
                    monitor: {},
                    debug: true,
                    server: path.resolve('./index'),
                    // livereload: true,
                    showStack: true
                }
            }
        },
        watch: {
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: ['views/index.html'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: ['views/index.html'],
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: watchFiles.clientCSS,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:8080'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                src: ['lib/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            }
        },

        regarde: {
            pub: {
                files: 'public/**/*',
                tasks: ['livereload']
            },
            trigger: {
                files: '.server',
                tasks: 'express-restart:livereload'
            },
            express: {
                files: 'views/index.html',
                tasks: ['livereload']
            }
        },

        jsbeautifier: {
            files: ['Gruntfile.js'],
            options: {
                'indent_size': 4,
                'indent_char': ' ',
                'indent_level': 0,
                'indent_with_tabs': false,
                'preserve_newlines': true,
                'max_preserve_newlines': 10,
                'jslint_happy': false,
                'brace_style': 'collapse',
                'keep_array_indentation': false,
                'keep_function_indentation': false,
                'space_before_conditional': true,
                'eval_code': false,
                'indent_case': false,
                'unescape_strings': false
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-regarde');

    grunt.registerTask('format', ['jshint', 'jsbeautifier']);
    grunt.registerTask('server', ['express', 'watch']);
    // Default task.
    grunt.registerTask('default', ['format', 'server']);

};
