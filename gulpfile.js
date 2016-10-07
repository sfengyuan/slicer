var gulp = require('gulp')
var sass = require('gulp-sass')
var pug = require('gulp-pug')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

var paths = {
  src: {
    sass: './src/sass/*.scss',
    pug: './src/pug/*.pug'
  },

  dist: {
    js: './dist/js',
    css: './dist/css',
    html: './dist'
  }
}

gulp.task('sass', function(){
  return gulp.src(paths.src.sass)
              .pipe(sass({style: 'compressed'}).on('error', sass.logError))
              .pipe(gulp.dest(paths.dist.css))
})

gulp.task('pug', function(){
  return gulp.src(paths.src.pug)
              .pipe(pug({pretty: true}))
              .pipe(gulp.dest(paths.dist.html))
})

gulp.task('minifyJS', function(){
  return gulp.src(paths.dist.js + '/slicer.js')
              .pipe(rename({suffix: '.min'}))
              .pipe(uglify())
              .pipe(gulp.dest(paths.dist.js))
})

gulp.task('watch', function(){
  gulp.watch(paths.src.sass, ['sass'])
  gulp.watch(paths.src.pug, ['pug'])
})

gulp.task('default', ['sass', 'pug', 'minifyJS'])
