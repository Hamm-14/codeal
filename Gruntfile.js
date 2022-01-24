const sass = require('node-sass');  //used to compile sass file into css file
const grunt = require('grunt');     //used for task runner
require('load-grunt-tasks')(grunt); //loading tasks automatically

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: "expanded",
                    implementation: sass,
                },
                files: [{
                    expand: true,
                    cwd: 'assets/scss',
                    src: '**/*.scss',
                    dest: 'assets/css',
                    ext: '.css'
                }]
            }
        }
    });
    grunt.registerTask('default',['sass']);
}