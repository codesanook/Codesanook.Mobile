//https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
//https://www.typescriptlang.org/docs/handbook/gulp.html

var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var paths = {
  sass: ['./scss/**/*.scss'],
  src: ['./src/**/*.ts']
};


gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task("compile", [], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['./src/app.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("./www/js/"));
});

gulp.task('watch', ['sass', 'compile'], function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.src, ['compile']);
});
