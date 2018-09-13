var pkg = require('./package.json');
var _cacheLocation = '.css-cache';

const gulp = require('gulp'),
      _ = require('lodash'),
      concat = require('gulp-concat'),
      consolidate = require('gulp-consolidate'),
      cssmin = require('gulp-cssmin'),
      imgmin = require('gulp-imagemin'),
      pleeease = require('gulp-pleeease'),
      plumber = require('gulp-plumber'),
      rename = require('gulp-rename'),
      stylus = require('gulp-stylus'),
      pug = require('gulp-pug'),
      browser = require("browser-sync"),
      watch = require('gulp-watch'),
      webpack = require('gulp-webpack'),
      pngquant = require('imagemin-pngquant'),
      fs = require('fs'),
      convertEncoding = require('gulp-convert-encoding'),
      replace = require('gulp-replace');

/* ------------------------------------
 * cacheBustingのクエリ文字
 * ------------------------------------ */
const cacheBustQuery = "";

const DEV = './',
      PUBLIC = '../htdocs/';
      // PROD = '../prod/';

const PORT = "1049";

const _browser = [
  'ie >= 11',
  'ios >= 9',
  'android >= 5'
];

const path = {
  'stylus': {
    'watch'  :  DEV + 'stylus/**/*.+(styl|stylus|css )' ,
    'compile':  DEV + 'stylus/**/!(_)*.styl' ,
    'dist'   :  PUBLIC + 'assets/css/'
  },
  'pug': {
    'watch'  :  DEV + 'pug/**/*.+(pug|html)',
    'compile':  DEV + 'pug/**/!(_)*.pug',
    'dist'   :  PUBLIC
  },
  'img': {
    'watch'  :  DEV + 'images/**/*' ,
    'compile':  DEV + 'images/**/*' ,
    'dist'   :  PUBLIC + 'assets/images/' ,
    'distHard': PUBLIC + 'assets/imagesHard/'
  }
};

// stylus
gulp.task('stylus', function() {
  gulp.src( path.stylus.compile )
  .pipe(plumber())
  .pipe(stylus({
    cacheLocation: _cacheLocation
  }))
  .pipe(replace('__NOCACHE__', cacheBustQuery))
  .pipe(pleeease({
    autoprefixer: {
      browsers: _browser
    },
    // minifier: true,
    minifier: false,
    mqpacker: true
  }))
  .pipe(gulp.dest(path.stylus.dist));
});

// image size minify
// ガチの圧縮
gulp.task('imgmin+', function() {
  gulp.src(path.img.compile)
  .pipe(imgmin([
    pngquant({quality: 100-100, speed: 1})
  ]))
  // .pipe(imgmin({quality: '65-80', speed: 1}))
  .pipe(imgmin()) // 余計なガンマ値を削除するため
  .pipe(gulp.dest( path.img.distHard ));
});

// 圧縮まではしないけど、不要情報消す
gulp.task('imgmin', function() {
  gulp.src(path.img.compile)
  .pipe(imgmin())
  .pipe(gulp.dest( path.img.dist ));
});

// js concat
gulp.task('concat', function() {
  gulp.src([ DEV + 'js/lib/*'])
  .pipe(plumber())
  .pipe(concat('lib.js'))
  .pipe(gulp.dest(PUBLIC + 'assets/js'));
});

// webpack
gulp.task('webpack', function() {
  gulp.src([DEV + 'js/*.js', DEV + 'js/**/*.js'], {base: 'js'})
    .pipe(plumber())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(PUBLIC + 'assets/js'));
});

// pug
gulp.task('pug', function() {
  // 通常ページ
  gulp.src(path.pug.compile)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(replace('__NOCACHE__', cacheBustQuery))
    .pipe(gulp.dest( path.pug.dist) );
});


// browser
gulp.task('server', function() {
  browser({
    server: {
      baseDir: PUBLIC
    },
    open: 'external',
    port: PORT,
    notify: false,
    ui: false
  });
});

gulp.task('sync', function () {
  browser.reload();
});

gulp.task('default', ['webpack', 'concat', 'server','pug','stylus'], function(){
  watch(DEV + 'js/**/*.js', function(){
    gulp.start(['webpack', 'concat']);
  });
  watch(path.stylus.watch, function(){
    gulp.start(['stylus']);
  });
  watch(path.pug.watch, function() {
    gulp.start(['pug']);
  });
});


gulp.task('build', ['webpack', 'concat', 'pug', 'stylus'], function () {});

// gulp.task('prod', function () {
//   gulp.src(PUBLIC + '**/*')
//     .pipe(gulp.dest(PROD));
// });
//
// gulp.task('encorder', function () {
//   gulp.src(PROD + '**/*.+(html|js|css)')
//     .pipe(replace('UTF-8', 'euc-jp'))
//     .pipe(convertEncoding({ to: 'euc-jp' }))
//     .pipe(gulp.dest(PROD));
// });
