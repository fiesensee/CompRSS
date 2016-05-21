var gulp = require('gulp');

var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function() {
  return gulp.src('./src/**/*.ts')
    .pipe(ts(tsProject))
    .js.pipe(gulp.dest('./app/js/'));
});
