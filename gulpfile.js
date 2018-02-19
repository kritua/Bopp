'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var moduleImporter = require('sass-module-importer');
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
var rigger = require('gulp-rigger');
var replace = require('gulp-replace');


gulp.task('style', function () {
	gulp.src('src/sass/style.scss')
		.pipe(plumber())
		.pipe(sass({ importer: moduleImporter() }))
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
		.pipe(minify())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('build/css'))
		.pipe(server.stream());
});

gulp.task('serve', ['style'], function () {
	server.init({
		server: {
			baseDir: './build'
		},
		notify: false,
		open: true,
		ui: false
	});

	gulp.watch(['src/sass/**/*.{scss,sass}', 'src/block/**/*.{scss,sass}'], ['style']);
	gulp.watch(['src/js/*.js', '!js/script.min.js'], ['scripts']);
	gulp.watch(['src/pages/*.html', 'src/block/**/*.html'], ['rigger-full']).on('change', server.reload);
});

gulp.task('scripts', function () {
	return gulp.src([
			'!src/js/script.min.js',
			'src/js/jquery.js',
			'src/js/moment.min.js',
			'src/js/**/*.js'
		])
		.pipe(concat('script.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(rename('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
		.pipe(server.stream());
});

gulp.task('copyJs', function() {
    return gulp.src(['src/js/inputmask/**/*'])
        .pipe(gulp.dest('build/js/inputmask/'))
});

gulp.task('raster', function () {
	return gulp.src([
			'src/img/**/*.{png,jpg,gif,ico}'
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
	return gulp.src(['src/img/**/*.svg'])
		.pipe(svgo())
		.pipe(gulp.dest('build/img'));
});

gulp.task('copy', function () {
	return gulp.src([
			'*/classes/**/*',
			'*/fonts/*.*',
			'*/*.php',
			'*/img/*.gif',
			'*/sass/*.gif',
			'*/img/*.ico'
		])
		.pipe(rename(function (path) {
		    if(path.extname === '.gif') {
                path.dirname = '/css';
            } else {
                path.dirname = path.dirname.substr(3, path.dirname.length);
            }
		}))
		.pipe(gulp.dest('./build'))
		.pipe(server.stream());
});

gulp.task('rigger-php', function() {
	return gulp.src('src/pages/*.html')
		.pipe(rigger())
		.pipe(ext('.php'))
		.pipe(gulp.dest('build'))
		.pipe(server.stream())
});

gulp.task('rigger-html', function() {
	return gulp.src('src/pages/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('temp'))
		.pipe(server.stream())
});

gulp.task('replace-php', function() {
	return gulp.src('temp/**/*.html')
		.pipe(replace('php', 'html'))
		.pipe(gulp.dest('build'))
		.pipe(server.stream())
});

gulp.task('rigger-full', function(done) {
	return run(
		'rigger-html',
		'replace-php',
		done
	)
});

gulp.task('clean', function () {
	return del(['build/**', '!build'], {force: true});
});

gulp.task('build-prod', function (done) {
	run(
		'clean',
		['rigger-php', 'style', 'scripts', 'copyJs', 'copy', 'raster', 'vector'],
		done
	);
});

gulp.task('clear-temp', function() {
		return del(['temp/**', '!temp'], {force: true})
});

gulp.task('build-dev', function (done) {
	return run(
		'clean',
		'rigger-html',
		['replace-php', 'style', 'scripts', 'copyJs', 'copy', 'raster', 'vector'],
		'clear-temp',
		done
	);
});


gulp.task('build-dev-serv', function (done) {
	run(
		'clean',
		'rigger-html',
		['replace-php', 'style', 'scripts', 'copyJs', 'copy', 'raster', 'vector'],
		'clear-temp',
		'serve',
		done
	);
});