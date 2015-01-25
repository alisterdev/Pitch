var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var gutil = require('gulp-util');
var include = require('gulp-include');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var dest = {
  css: './www/css',
  js: './www/js',
  fonts: './www/fonts',
  templates: './www/templates',
  general: './www/'
};

var files = {
  css: [
    './app/lib/leaflet/dist/leaflet.css'
  ],
  js: [
    './app/lib/ionic/js/ionic.bundle.js',
    './app/lib/ionic-contrib-icon/ionic.icon.js',
    './app/lib/angular-resource/angular-resource.js',
    './app/lib/angular-local-storage/dist/angular-local-storage.js',
    './app/lib/angular-cached-resource/angular-cached-resource.js',
    './app/lib/leaflet/dist/leaflet.js',
    './app/lib/angular-leaflet-directive/dist/angular-leaflet-directive.js',
    './app/lib/ngCordova/dist/ng-cordova.js',
    './app/js/**/*.js',
    '!./app/js/facebookConnectPlugin.js'
  ],
  fonts: [
    './app/lib/ionicons/fonts/**/*.*'
  ],
  sass: [
    './app/sass/app.scss'
  ],
  templates: [
    './app/templates/**/*.*'
  ],
  general: [
    './app/index.html'
  ],
  facebook: [
    './app/js/facebookConnectPlugin.js'
  ]
};

var paths = {
  js: ['./app/js/**/*.js'],
  sass: ['./app/sass/**/*.scss'],
  templates: files.templates,
  general: files.general
};

gulp.task('default', gulpsync.sync(['clean', 'move:fonts', 'move:templates', 'move:facebook', 'include:general', 'concat:css', 'concat:js', 'sass']));

gulp.task('build', gulpsync.sync(['clean', 'move:fonts', 'move:templates', 'move:general', 'concat:css', 'concat:js', 'sass']));

gulp.task('clean', function() {
  return gulp.src('./www/**/*.*', { read: false })
    .pipe(clean());
});

gulp.task('move:fonts', function() {
  gulp.src(files.fonts)
    .pipe(gulp.dest(dest.fonts));
});

gulp.task('move:templates', function() {
  gulp.src(files.templates)
    .pipe(gulp.dest(dest.templates));
});

gulp.task('move:general', function() {
  gulp.src(files.general)
    .pipe(gulp.dest(dest.general));
});

gulp.task('move:facebook', function() {
  gulp.src(files.facebook)
    .pipe(gulp.dest(dest.js));
});

gulp.task('include:general', function() {
  gulp.src(files.general)
    .pipe(include())
    .pipe(gulp.dest(dest.general));
});

gulp.task('concat:css', function() {
  gulp.src(files.css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(dest.css));
});

gulp.task('concat:js', function() {
  gulp.src(files.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dest.js));
});

gulp.task('sass', function() {
  gulp.src(files.sass)
    .pipe(sass())
    .pipe(gulp.dest(dest.css))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest(dest.css));
});

gulp.task('watch', function() {
  gulp.watch(paths.general, ['move:general']);
  gulp.watch(paths.templates, ['move:templates']);
  gulp.watch(paths.js, ['concat:js']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
