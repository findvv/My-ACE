var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    uglyfly = require('gulp-uglyfly'),
    less = require('gulp-less'),
    path = require('path'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({
      advanced: true
    }),
    autoprefix = new LessPluginAutoPrefix({
      browsers: ["ie >= 8", "ie_mob >= 10", "ff >= 26", "chrome >= 30", "safari >= 6", "opera >= 23", "ios >= 5", "android >= 2.3", "bb >= 10"]
    });

gulp.task('less', function() {
  gulp.src('./app/less/style.less')
    .pipe(less({
      plugins: [autoprefix, cleancss],
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js',function(){
  gulp.src('./public/js/bundle.min.js')
})
gulp.task('html',function(){
  gulp.src('./index.html')
});
gulp.task('css',function(){
  gulp.src('./public/css/*.css')
});

gulp.task('browserify', function() {
  browserify('./app/js/main.js')
    .transform("babelify", {
      presets: ["es2015"]
    })
    .bundle()
    .pipe(source('bundle.min.js'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(uglyfly())
    .pipe(gulp.dest('./public/js/'))
});

gulp.task('watch', function() {
  gulp.watch('./app/less/style.less', ['less']);
  gulp.watch('./app/js/*.js',['browserify']);
  gulp.watch('./app/js/*/*.js',['browserify']);
  gulp.watch('./public/js/bundle.min.js',['js']);
  gulp.watch('./index.html',['html']);
  gulp.watch('./public/css/*.css',['css']);
});

gulp.task('default',['less','browserify','watch']);

// gulp.task('default', ['less','browserify']);
