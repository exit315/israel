"use strict";

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
//var csso = require('gulp-csso');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var sassGlob = require('gulp-sass-glob');

//var del = require('del');

//gulp.task("clean", function () {
//  return del("build");
//});

//gulp.task("copy", function () {
//  return gulp.src([
//    "source/fonts/**/*.{woff,woff2}",
//    "source/img/**",
//    "source/js/**",
//    "source/*.html"
//  ], {
//    base: "source"
//  })
//  .pipe(gulp.dest("build"));
//});

gulp.task("css", function() {
  return gulp.src("source/sass/style.scss")
    .pipe(sassGlob())
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));
