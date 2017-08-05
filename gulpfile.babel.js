import gulp from 'gulp';
import babel from 'gulp-babel';
import coveralls from 'gulp-coveralls';
import sass from 'gulp-sass';

gulp.task('transpile', () =>
  gulp.src(['server/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist')));

gulp.task('coveralls', () =>
  gulp.src('coverage/lcov.info')
    .pipe(coveralls())
);

gulp.task('sass', () =>
  gulp.src('./template/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./template/css/'))
);

gulp.task('sass:watch', () =>
  gulp.watch('./template/scss/**/*.scss', ['sass'])
);
