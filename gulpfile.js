// This is the updated script for Bootstrap 4 in 2018 - Free Crash Course of 4.0.0 Tutorial 

var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
  return gulp
    .src(["src/scss/*.scss"])
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
  }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});
// Move the javascript files into our /src/js folder
gulp.task("js", function() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js"
    ])
    .pipe(gulp.dest("src/js/"))
    .pipe(browserSync.stream());
});
// Static Server + watching scss/html files
gulp.task(
  "serve",
  gulp.series(["sass"], function() {
    browserSync.init({
      server: "./"
    });
    gulp.watch(
      ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"],gulp.series(["sass"])
    );
    gulp.watch("*.html").on("change", browserSync.reload);
  })
);
gulp.task("default", gulp.series(["js", "serve"]));