'use strict';

const gulp = require('gulp');
const pump = require('pump');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const babel = require('gulp-babel');
const svgmin = require('gulp-svgmin');

// SCSS compile and autoprefixer
gulp.task('sass', () => {
    return gulp.src('./dev/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('', {addComment: false}))
        .pipe(gulp.dest('./public/css'));
});

// JSHint/Lint
gulp.task('hint', () => {
    return gulp.src('./dev/js/*.js')
        .pipe(jshint({esnext: true}))
        .pipe(jshint.reporter(stylish))
});

// Compress & Concatenate JS
gulp.task('compress', (cb) => {
    pump([
            gulp.src([
                './node_modules/jquery/dist/jquery.js',
                './node_modules/foundation-sites/dist/foundation.js',
                './dev/js/*.js'
            ]),
            sourcemaps.init(),
            babel({presets: ['es2015']}),
            concat('app.js'),
            uglify(),
            sourcemaps.write('', {addComment: false}),
            gulp.dest('./public/js')
        ],
        cb
    );
});

// Image minification
gulp.task('img', () => {
    return gulp.src('./dev/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img/'));
});

// SVG minification
gulp.task('svg', () => {
    return gulp.src('./dev/svg/**/*.svg')
        .pipe(svgmin({
            plugins: [
                {removeDoctype: true},
                {removeComments: true}
            ]
        }))
        .pipe(gulp.dest('./public/svg'));
});

// Watch
gulp.task('watch', () => {
    gulp.watch('./dev/scss/**/*.scss', ['sass']);
    gulp.watch('./dev/js/**/*.js', ['js']);
    gulp.watch('./dev/img/**/*.*', ['img']);
    gulp.watch('./dev/svg/**/*.svg', ['svg']);
});

// Default task
gulp.task('default', ['sass', 'js', 'img', 'svg', 'watch']);
gulp.task('js', ['hint', 'compress']);
