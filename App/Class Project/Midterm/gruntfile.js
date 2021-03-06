module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            production: {
                NODE_ENV: 'production'
            }
        },
        nodemon: {
            dev: { script: 'index.js' },

            all: ['Grunfile.js', 'config/*.js']
        },
    });

    grunt.loadNpmTasks('grunt-contrib-nodemon');
    grunt.loadNpmTasks('grunt-env');
    grunt.registerTask('default', [
        'nodemon'
    ]);
    grunt.registerTask('production', [
        'nodemon'
    ]);
};   