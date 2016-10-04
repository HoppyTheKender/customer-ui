var gulp 				 = require('gulp'),
	gulpif 				 = require('gulp-if'),
	angularFilesort 	 = require('gulp-angular-filesort'),
	angularTemplateCache = require('gulp-angular-templatecache'),
	concat 				 = require('gulp-concat'),
	cleanCSS			 = require('gulp-clean-css'),
	del 				 = require('del'),
	eslint      		 = require('gulp-eslint'),
	filter      		 = require('gulp-filter'),
	fs 					 = require('fs'),
	istanbul			 = require('gulp-istanbul'),
	rename 				 = require('gulp-rename'),
	sass				 = require('gulp-sass'),
	sourcemaps 			 = require('gulp-sourcemaps'),
	uglify 				 = require('gulp-uglify'),
	yargs				 = require('yargs');

// ** Arguments
var argv = yargs.argv;

// ** Configuration
var config = {
		output: {
			js: 'build/js',
			templates: 'build/js',
			css: 'build/css'
		},
		paths: {
			js: [
				'app.js',
				'app/**/*.js'
			],
			templates: [
			    'app/**/*.html'
			],
			vendorJs: [
			    'js/jquery.min.js',
			    'js/bootstrap.min.js',
			    'js/angular.min.js',
			    'js/angular-ui-router.js',
			    'js/ui-bootstrap-tpls.min.js'
			],
			sass: [
			    'css/**/*.scss'
			]
		}
};

// ** Watches
gulp.task('watch', function () {
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.templates, ['templates']);
	gulp.watch(config.paths.sass, ['sass']);
});

// ** Build Tasks
gulp.task('build', ['js', 'js-vendor', 'templates', 'sass']);

// ** JavaScript
gulp.task('js:clean', function () {
	return del([ config.output.js + '/app*.js' ]);
});

gulp.task('js', ['js:clean'], function () {
	return gulp.src(config.paths.js)
		.pipe(angularFilesort())
		.pipe(sourcemaps.init())
			.pipe(concat('app.js'))
			.pipe(gulpif(argv.coverage, istanbul({ coverageVariable: '__coverage__' })))
		.pipe(sourcemaps.write())
			.pipe(gulp.dest(config.output.js))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
			.pipe(gulp.dest(config.output.js));
});

// ** Templates
gulp.task('templates:clean', function () {
	return del([ config.output.js + '/templates*.js']);
});

gulp.task('templates', ['templates:clean'], function () {
	return gulp.src(config.paths.templates)
		.pipe(angularTemplateCache({
			module: 'modernizationCloud',
			root: 'app/'
		}))
			.pipe(gulp.dest(config.output.templates))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
			.pipe(gulp.dest(config.output.templates));
});

//** 3rd Party JavaScript
gulp.task('js-vendor:clean', function () {
	return del([ config.output.js + '/vendor*.js' ]);
});

gulp.task('js-vendor', ['js-vendor:clean'], function () {
	return gulp.src(config.paths.vendorJs)
		.pipe(sourcemaps.init())
		.pipe(concat('vendor.js'))
		.pipe(sourcemaps.write())
			.pipe(gulp.dest(config.output.js))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
			.pipe(gulp.dest(config.output.js));
});

//** SASS
gulp.task('sass', function () {
	return gulp.src(config.paths.sass)
		.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest(config.output.css))
		.pipe(rename({ suffix: '.min' }))
		.pipe(cleanCSS())
			.pipe(gulp.dest(config.output.css))
});

//** Linting
gulp.task('lint', ['js'], function () {
	return gulp.src(config.paths.js)
		.pipe(eslint())
		.pipe(eslint.formatEach())
		.pipe(eslint.format('checkstyle', fs.createWriteStream('checkstyle.xml')));
});