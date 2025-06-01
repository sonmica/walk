module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> - Development Build */\n'
        },
        files: [{
          expand: true,
          cwd: 'walk/src/js/',                    // Source directory
          src: '**/*.js',
          dest: 'walk/build/js/'                   // Destination directory
        }]
      },
      prod: {
        options: {
          banner: '/*! <%= pkg.name %> - Production Build */\n',
          mangle: true,
          compress: true
        },
        files: [{
          expand: true,
          cwd: 'walk/src/js/',
          src: '**/*.js',
          dest: 'walk/dist/js/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
};