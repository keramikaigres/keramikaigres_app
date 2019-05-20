let gulp = require("gulp");
watch = require('gulp-watch');
let sass = require('gulp-sass'); // Подключаем Sass пакет
sass.compiler = require('node-sass');


gulp.task('sass', function () {
   return gulp.src('./sass/*.scss')
     .pipe(sass().on('error', sass.logError))
     .pipe(gulp.dest('./public/css/'));
 });
  
 gulp.task('watch', function () {
   gulp.watch('./sass/*.scss', gulp.series('sass'));
 });







