module.exports = function(grunt) {
  require('time-grunt')(grunt);
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    paths: {
      dest : 'dest',
      dist : 'dist',
      src  : 'src'
    },

		assemble: {
      options: {
        pkg   : '<%= pkg %>',
        data  : '<%= paths.dist %>/_data/*.json',
      },
			dev: {
				files: [{
					expand : true,
					cwd    : '<%= paths.dist %>/_page/',
					src    : ['*.hbs'],
					dest   : '<%= paths.dest %>/page/',
					ext    : '.html'
				}]
			}
		},

		svgstore: {
			options: {},
			default : {
				files: {
					'<%= paths.dest %>/dest.svg' : ['<%= paths.src %>/*.svg'],
					'<%= paths.dest %>/dest.ai'  : ['<%= paths.src %>/*.ai'],
				},
			},
		},
		
		svgsprite       : {
			spriteSass    : {
				src         : ["<%= paths.src %>"],
				dest        : "<%= paths.dest %>/sprite/",
				options     : {
					render    : {
					  html    : true,
						css     : false,
						less    : {
							dest  : 'less/_sprite'
						}
					},
					maxwidth  : 50,
					maxheight : 50,
					padding   : 10,
					keep      : true,
					dims      : true
				}
			}
		},
		
		grunticon: {
			myIcons: {
				files: [{
					expand: true,
					cwd             : '<%= paths.src %>',
					src             : ['*.svg', '*.png'],
					dest            : '<%= paths.dest %>/grunticons/'
				}],
				options: {
						defaultWidth  : "40px",
						defaultHeight : "40px"
				}
			}
		},

		webfont: {
			icons: {
				src          : '<%= paths.src %>/*.svg',
				dest         : '<%= paths.dest %>/webfonts',
				options: {
					stylesheet : 'less'
				}
			}
		},

    watch: {
			svgstore: {
				files  : ['<%= paths.dest %>/dest.ai', '<%= paths.dest %>/dest.svg'],
				tasks  : "svgstore"
			},
    },

    connect: {
      options: {
        hostname : '*',
        port     : 9001
      },
      server: {
        options: {
          base        : '<%= paths.dev %>',
          open        : true,
          keepalive   : true,
          livereload  : true,
        }
      }
    }
  });

  //load npm tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['svgstore', 'svgsprite', 'grunticon:myIcons', 'webfont', 'assemble:dev']);
	grunt.registerTask('preview', ['connect']);  
};