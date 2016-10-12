var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var del = require('del');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var templateCache = require('gulp-angular-templatecache');
var template = require('gulp-template');


// Config
var now = new Date();
var config = {
  buildLabel: '' + now.getFullYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds(),
  buildMode: null,
  version: process.env.BUILD_NUMBER || 'dev'
};

/*****************************TASKS********************************/
/**************************COMMON TASKS****************************/
// Config DEV
gulp.task('config:dev', function() {
  config.buildMode = 'dev';
});

// Config PROD
gulp.task('config:prod', function() {
  config.buildMode = 'prod';
});

// Clean CSS
gulp.task('clean:css', function() {
  return del([
    '../www/css/**/*'
  ], { force: true });
});

// Clean JS
gulp.task('clean:js', function() {
  return del([
    '../www/js/**/*'
  ], { force: true });
});

// Clean Everything
gulp.task('clean', ['clean:js', 'clean:css'], function() {
  return true;
});

gulp.task('copy:res', function() {
  return gulp.src(['./img/**/*'], {
    base: './img/'
  }).pipe(gulp.dest('../www/img/'));


});

gulp.task('compile:css', function() {
  // compiling the style
  return gulp.src('./scss/main.scss')
    // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
    .pipe(sass({
      onError: function(e) {
        console.log(e);
        gutil.log(e);
      }
    }))
    // Optionally add autoprefixer
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .pipe(rename('bundle.css'))
    .pipe(gulpif(config.buildMode === 'prod', minifyCSS()))
    .pipe(gulp.dest('../www/css/'));
});

gulp.task('build:style', function() {
  runSequence(['copy:res', 'compile:css']);
});

// create module for templates
gulp.task('create:templates', function() {
  gulp.src('./app/**/*.html')
    .pipe(templateCache({
      transformUrl: function(url) {
        return './app/' + url;
      }
    }))
    .pipe(gulp.dest('./app/templates'));
});

// JSHint task
gulp.task('lint:js', function() {
  return gulp.src(['./app/**/*.js', '!./app/templates/**/*.js'])
    .pipe(jshint())
    // You can look into pretty reporters as well, but that's another story
    .pipe(jshint.reporter('default'));
});

gulp.task('build:indexfile', function() {
  return gulp.src('./index.html')
    // And put it in the dist folder
    .pipe(template({
      version: config.version,
      buildLabel: config.buildLabel
    }))

  .pipe(gulp.dest('../www/'));
});


// build for development
gulp.task('build:dev', function() {
  runSequence(
    ['clean', 'config:dev'], ['build:style', 'lint:js'], ['build:angular', 'build:indexfile']
  );
});

//  build for production
gulp.task('build:prod', function() {
  runSequence(
    ['clean', 'config:prod'], ['build:style', 'lint:js'], ['build:angular', 'build:indexfile']
  );
});

// watchers
gulp.task('watch', ['build:dev'], function() {
  // JS watcher
  gulp.watch([
    './index.html',
    './app/**/*.html',
    './app/**/*.js'
  ], [
    'lint:js',
    'build:angular'
  ]);

  // SCSS watcher
  gulp.watch([
    './style/**/*.scss'
  ], ['compile:css']);
});

/*************************APP*************************/

gulp.task('build:js', ['create:templates'], function() {
  console.log('AngJS build version: ' + config.buildMode);

  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './app/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // .pipe(cachebust.resources())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    // Add transformation tasks to the pipeline here.
    // only if in production UGLIFY
    .pipe(gulpif(config.buildMode === 'prod', uglify({ mangle: false })))
    .on('error', function(error) {
      console.log(error);
      gutil.log(error);
    })
    .pipe(sourcemaps.write('./maps/'))
    .pipe(gulp.dest('../www/js/'));
});

gulp.task('build:angular', function() {
  config.buildMode = 'dev';
  runSequence(
    ['build:js']
  );
});
