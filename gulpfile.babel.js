import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('transpile', () =>
gulp.src(['server/**/*.js'])
.pipe(babel())
.pipe(gulp.dest('dist')));

