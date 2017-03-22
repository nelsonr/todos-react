'use strict';

// Run the `gulp` command in terminal

var gulp       = require('gulp');
var sass       = require('gulp-sass');
var prefixer   = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');

// SASS TASK

// Output style for generated CSS
// The available options are:
// - nested
// - expanded
// - compact
// - compressed
//
// Reference: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
var outputStyle = 'compact';

gulp.task('sass', function () {
    gulp.src('src/scss/**/app.scss')
        .pipe(sass({outputStyle: outputStyle}).on('error', sass.logError))
        .pipe(prefixer().on('error', function(e) { console.log(e.message); }))
        .pipe(gulp.dest('public/css'))
        .pipe(livereload());
});

// RUN DEFAULT

gulp.task('default', function () {
    livereload.listen();
    gulp.watch('src/scss/**/*.scss', ['sass']);
});
