module.exports = function(grunt){
	//项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
	            ' * Theme Name: <%= pkg.name %>\n' +
	            ' * Theme URI: <%= pkg.themeURI %>\n' +
	            ' * Description: <%= pkg.description %>\n' +
	            ' * Author: <%= pkg.author %>\n' +
	            ' * Author URI: <%= pkg.authorURI %>\n' +
	            ' * Version: <%= pkg.version %>\n' +
	            ' * © <%= grunt.template.today("yyyy") %> <%= pkg.author%>. All rights reserved.\n' +
	            ' */\n',
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			build: {
				files: {
					'js/app.min.js': [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/fullpage.js/jquery.fullPage.js',
						'js/common.js'
					]
				}
			}
		},
		less: {
			build: {
				files: {
					'css/style.css': 'less/build.less'
				}
			}
		},
		csscomb: {
			options: {
				config: 'less/.csscomb.json'
			},
			build: {
				files: {
					'css/style.css': 'css/style.css'
				}
			}
		},
		cssmin: {
			options: {
				banner: '<%= banner %>',
				keepSpecialComments: '0'
			},
			build: {
				files: {
					'css/app.min.css': [
						'bower_components/normalize.css/normalize.css',
						'bower_components/font-awesome/css/font-awesome.css',
						'bower_components/fullpage.js/jquery.fullPage.css',
						'css/style.css'
					]
				}
			}
		},
		copy: {
			release: {
				files: [
					{
						expand: true,
						// cwd: 'bower_components/font-awesome/fonts/',
						src:[
							'css/**/*',
							'fonts/**/*',
							'images/**/*',
							'img/**/*',
							'inc/**/*',
							'js/**/*',
							'option/**/*',
							'pages/**/*',
							'widget/**/*',
							'screenshot.*',
							'*.html'
						],
						dest: 'release/'
					},
				]
			}
		},
		watch: {
			less: {
				files: [
					'less/*.less',
					'less/*/*.less'
				],
				tasks: ['less', 'csscomb', 'cssmin:build']
			},
			scripts: {
				files: ['js/common.js'],
				tasks: ['uglify:build']
			}
		}
	});
	//加载插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-csscomb');
	//制定任务
	grunt.registerTask('default',['uglify', 'less', 'csscomb', 'cssmin', 'watch']);
	grunt.registerTask('release',['uglify', 'less', 'csscomb', 'cssmin', 'copy:release', 'watch']);
}