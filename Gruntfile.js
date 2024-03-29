'use strict';
module.exports = function( grunt ) {
    var pkg = grunt.file.readJSON( 'package.json' );
    grunt.initConfig( {
        // Settings folder directories
        dirs: {
            dist: 'assets/dist/',
            source: 'assets/source/',
        },

        // Minify all css files
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                sourceMap: true,
                root: 'root',
            },
            target: {
                files: {
                    '<%= dirs.dist %>/css/productify.main.min.css': [
                        '<%= dirs.source %>/css/productify.main.css'
                    ],

                    '<%= dirs.dist %>/css/postify.main.min.css': [
                        '<%= dirs.source %>/css/postify.main.css'
                    ],
                }
            }
        },

        // Minify all js files
        uglify: {
            options: {
                mangle: false,
                sourceMap: true,
            },
            my_target: {
                files: {
                    '<%= dirs.dist %>/js/productify.main.min.js': [
                        '<%= dirs.source %>/js/productify.main.js'
                    ],
                    '<%= dirs.dist %>/js/postify.main.min.js': [
                        '<%= dirs.source %>/js/postify.main.js'
                    ]
                }
            }
        },

        // Watch all changes
        watcher: {
            css: {
                files: [ '<%= dirs.source %>/css/*.css' ],
                tasks: [ 'cssmin' ],
            },
            scripts: {
                files: [ '<%= dirs.source %>/js/*.js' ],
                tasks: [ 'uglify' ]
            },
        },

        // Generate POT file
        makepot: {
            target: {
                options: {
                    domainPath: '/languages/',
                    potFilename: 'postify-for-elementor',
                    type: 'wp-plugin',
                }
            }
        },

        // clean the build dir
        clean: {
            main: [ 'build/' ]
        },

        // Copy the plugin into the build dir
        copy: {
            main: {
                src: [
                    '**',
                    '!node_modules/**',
                    '!build/**',
                    '!testing/**',
                    '!bin/**',
                    '!.git/**',
                    '!Gruntfile.js',
                    '!package.json',
                    '!package-lock.json',
                    '!debug.log',
                    '!phpunit.xml',
                    '!.gitignore',
                    '!.gitmodules',
                    '!npm-debug.log',
                    '!assets/less/**',
                    '!tests/**',
                    '!**/Gruntfile.js',
                    '!**/package.json',
                    '!**/README.md',
                    '!**/export.sh',
                    '!**/*~'
                ],
                dest: 'build/'
            }
        },

        // Compress Everything
        compress: {
            main: {
                options: {
                    mode: 'zip',
                    archive: './build/postify-for-elementor-v-' + pkg.version + '.zip',
                },
                expand: true,
                cwd: 'build/',
                src: [ '**/*' ],
                dest: 'postify-for-elementor'
            }
        },

        // Generate Text Domain
        addtextdomain: {
            options: {
                textdomain: 'postify-for-elementor',
                updateDomains: [ 'postify-for-elementor' ]
            },
            target: {
                files: {
                    src: [
                        '*.php',
                        '**/*.php',
                        '!node_modules/**',
                        '!tests/**'
                    ]
                }
            }
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks( 'grunt-wp-i18n' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-compress' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-watcher' );

    // Register Grunt NPM Tasks
    grunt.registerTask( 'default', [ 'clean', 'cssmin', 'uglify', 'watcher' ] );
    grunt.registerTask( 'release', [ 'makepot' ] );
    grunt.registerTask( 'textdomain', [ 'addtextdomain' ] );
    grunt.registerTask( 'zip', [ 'clean', 'cssmin', 'uglify', 'copy', 'compress' ] );
}