var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');

var SRC = ".";
var SRC_FRONTEND = "js";
var SRC_MODULE_JS = path.join(SRC, "*.module.js");
var SRC_CONFIG_JS = path.join(SRC, "*.config.js");
var SRC_START_JS = path.join(SRC, "*.start.js");
var SRC_JAVASCRIPT_ALL = path.join(SRC, SRC_FRONTEND, "*.js");

function compileJS(){
	return gulp.src([SRC_MODULE_JS, SRC_CONFIG_JS, SRC_JAVASCRIPT_ALL, SRC_START_JS])
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default', { verbose: true }))
		.pipe(plugins.concat('app.js'))
		.pipe(gulp.dest('.'));
} 

gulp.task('clean', function(){
	return gulp.src("./app.js")
		.pipe(plugins.clean());
});

gulp.task('dist', function(){
	return compileJS();	
});
