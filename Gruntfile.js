module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        npmcopy: {
            libs: {
                files: {
                    'uber/static/deps/libs/moment.js': 'moment:main',
                    'uber/static/deps/libs/choices.js':'choices.js:main',
                    'uber/static/deps/libs/flatpickr.css':'flatpickr/dist/flatpickr.css',
                    'uber/static/deps/libs/flatpickr.js':'flatpickr:main',
                    'uber/static/deps/libs/moment-tz-10yr.js':'moment-timezone/builds/moment-timezone-with-data-10-year-range.js'
                }
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';',
                },
                src: [
                    'uber/static/deps/libs/moment.js',
                    'uber/static/deps/libs/choices.js',
                    'uber/static/deps/libs/flatpickr.js',
                    'uber/static/deps/libs/moment-tz-10yr.js'
                ],
                dest: 'uber/static/deps/combined.js',

            },
            css: {
                src: ['uber/static/deps/libs/*.css', 'uber/static/deps/choices/choices-bootstrap.css'],
                dest: 'uber/static/deps/combined.css',
            }
        },
        terser: {
            options: {
                mangle: false,
                sourceMap: true
            },
            target: {
                files: {
                    'uber/static/deps/combined.min.js': ['uber/static/deps/combined.js']
                }
            }
        },
        cssmin: {
            options: {
                sourceMap: true,
                rebaseTo: 'uber/static/deps'
            },
            target: {
                files: {
                    'uber/static/deps/combined.min.css': ['uber/static/deps/combined.css']
                }
            }
        },
        replace: {
            correct_sourcemap: {
                src: ['uber/static/deps/combined.min.css.map'],
                overwrite: true,
                replacements: [{
                    from: '"uber/static/deps/combined.css"',
                    to: '"/uber/static/deps/combined.css"'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-npmcopy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-terser');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.registerTask('default', ['npmcopy', 'concat', 'terser', 'cssmin', 'replace']);
};
