'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var del = require('del');
var ext = require('gulp-ext-replace');
var run = require('run-sequence');
var rename = require('gulp-rename');
var minify = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var svgo = require('gulp-svgmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('style', function () {
	gulp.src('sass/style.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({
				browsers: [
					'last 1 version',
					'last 2 Chrome versions',
					'last 2 Firefox versions',
					'last 2 Opera versions',
					'last 2 Edge versions'
				]
			})
		]))
		.pipe(gulp.dest('build/css'))
		.pipe(minify())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('build/css'))
		.pipe(gulp.dest('css'))
		.pipe(server.stream());
});

gulp.task('serve', ['style'], function () {
	server.init({
		server: '.',
		notify: false,
		open: true,
		ui: false
	});

	gulp.watch('sass/**/*.{scss,sass}', ['style']);
	gulp.watch(['js/*.js', '!js/script.min.js'], ['scripts']);
	gulp.watch('*.html').on('change', server.reload);
});

gulp.task('scripts', function () {
	gulp.src([
			'!js/script.min.js',
			'js/jquery.js',
			'js/**/*.js'
		])
		.pipe(concat('script.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(rename('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
		.pipe(gulp.dest('js'))
		.pipe(server.stream());
});

gulp.task('raster', function () {
	gulp.src([
			'img/**/*.{png,jpg,gif}'
		])
		.pipe(imagemin([
			imagemin.optipng({
				optimizationLevel: 3
			}),
			imagemin.jpegtran({
				progressive: true
			})
		]))
		.pipe(gulp.dest('build/img'))
});

gulp.task('vector', function () {
	gulp.src([
			'img/**/*.svg'
		])
		.pipe(svgo())
		.pipe(gulp.dest('build/img'));
});

gulp.task('copy', function () {
	return gulp.src([
			'classes/**/*',
			'fonts/*.*',
			'*.php',
			'css/*.gif',
			'img/*.ico'
		], {
			base: '.'
		})
		.pipe(gulp.dest('build'))
		.pipe(server.stream());
});

gulp.task('html-php', function () {
	gulp.src([
			'*.html',
			'!page-template.html'
		])
		.pipe(ext('.php'))
		.pipe(gulp.dest('build'))
});

gulp.task('clean', function () {
	return del(['build/**', '!build'], {force: true});
});

gulp.task('build', function (done) {
	run(
		'clean',
		['html-php', 'style', 'scripts', 'copy', 'raster', 'vector'],
		done
	);
});

