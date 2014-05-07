/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    font: {
        all: {
          // SVG files to read in
          src: ['src/**/*.svg'],

          // Location to output CSS variables
          destCss: 'dist/css/icons.styl',

          // Location to output fonts (expanded via brace expansion)
          destFonts: 'dist/fonts/icons.{svg,woff,eot,ttf}',

          // Multiple CSS outputs supported (generated .styl and .json files)
          destCss: 'dist/pu-icons/font.{styl,json}',

          // Alternative formats (1)
          destCss:[
            'dist/pu-icons/font.styl',
            'dist/pu-icons/font.json'
          ],
          destFonts: [
            'dist/pu-icons/font.svg',
            'dist/pu-icons/font.woff',
            'dist/pu-icons/font.eot'
          ],

          // Alternative formats (2)
          destFonts: {
            // Override specific engines
            json: 'dist/pu-icons/font.less',
            styl: 'dist/pu-icons/font.json'
          },
          destFonts: {
            // Override specific engines
            'dev-svg': 'dist/pu-icons/font.svg',
            woff: 'dist/pu-icons/font.waffles',
            eot: 'dist/pu-icons/more.like.eof'
          },

          // OPTIONAL: Specify CSS format (inferred from destCss' extension by default)
              // (stylus, less, scss, json)
          cssFormat: 'json',

          // Optional: Custom routing of font filepaths for CSS
          cssRouter: function (fontpath) {
            return 'mysubfolder/' + fontpath;
          },

          // Optional: Custom naming of font families for multi-task support
          fontFamily: 'my-icon-font',

          // OPTIONAL: Specify CSS options
          cssOptions: {}
        }
      }
    });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-fontsmith');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
