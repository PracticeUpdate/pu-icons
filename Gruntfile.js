module.exports = function (grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    paths: {
      dist: 'dist',
      src: 'src'
    },

    svgsprite: {
      spriteSass: {
        src: ["<%= paths.src %>"],
        dest: "<%= paths.dist %>/sprite/",
        options: {
          render: {
            html: true,
            css: false,
            less: {
              dest: 'less/_sprite'
            }
          },
          maxwidth: 50,
          maxheight: 50,
          padding: 10,
          keep: true,
          dims: true
        }
      }
    },

    grunticon: {
      myIcons: {
        files: [{
          expand: true,
          cwd: '<%= paths.src %>',
          src: '*.svg',
          dest: '<%= paths.dist %>/grunticons/'
        }],
        options: {
          defaultWidth: "40px",
          defaultHeight: "40px"
        }
      }
    },

    webfont: {
      myIcons: {
        src: '<%= paths.src %>/*.svg',
        dest: '<%= paths.dist %>/webfonts',
        syntax: 'pu-icon',
        options: {
         font: 'pu-icons',
         stylesheet: 'less',
         relativeFontPath: '/assets/fonts',
          templateOptions: {
            baseClass: 'pu-icon',
            classPrefix: 'pu-icon-',
            mixinPrefix: 'pu-icon_'
          }
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['svgsprite', 'grunticon:myIcons', 'webfont']);
};