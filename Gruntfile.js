/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        predef: ['angular'],
        undef: true,
        indent: 2,
        maxlen: 80,
        quotmark: 'single',
        camelcase: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      scripts: {
        src: ['app/**/*.js']
      }
    },

    watch: {
      options: {
        livereload: true,
        port: 'localhost/8888'
      },
      /*compass: {
        files: 'styles/*.css',
        tasks: ['compass:server', 'autoprefixer']
      },*/
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: [
          '<%= jshint.scripts.src %>',
          'index.html',
          'app/**/*.html',
          'styles/*.css'
        ],
        tasks: ['jshint:scripts']
      }
    },

    copy: {
      dist: {
        files: [ {src: 'index.html', dest: 'dist/index.html'} ]
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'states/**/*.js'
        ],
        dest: 'dist/app.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/app.js': 'dist/app.js'
        }
      }
    },

    useminPrepare: {
      options: {
        dest: 'dist'
      },
      html: 'index.html'
    },

    usemin: {
      html: ['dist/index.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'jshint',
    'useminPrepare',
    'copy',
    'concat',
    'uglify',
    'usemin'
  ]);
};
