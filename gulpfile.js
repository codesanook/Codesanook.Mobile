//https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
//https://www.typescriptlang.org/docs/handbook/gulp.html
const gulp = require("gulp");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");

const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

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
  var b = browserify({
    basedir: '.',
    debug: true,
    entries: ['./src/app.ts'],
    cache: {},
    packageCache: {}
  });
  b.ignore("jquery");//and include it directly
  b.plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("./www/js/"));
});

//support build with webpack, just experiment
gulp.task('webpack', () => {
  gulp.src('./src/app.ts')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('watch', ['sass', 'compile'], function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.src, ['compile']);
});