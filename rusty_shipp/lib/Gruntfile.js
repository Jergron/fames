module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['./rusty_shipp/js/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      js: {
        files: ['../rusty_shipp/js/**/*.js'],
        tasks: ['jshint']
      },
      assets: {
        files: ['../rusty_shipp/assets/**/*.js'],
        tasks: ['jshint']
      },
			sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
    }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};