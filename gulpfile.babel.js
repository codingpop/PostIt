import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-babel-istanbul';
import coveralls from 'gulp-coveralls';

gulp.task('transpile', () =>
gulp.src(['server/**/*.js'])
.pipe(babel())
.pipe(gulp.dest('dist')));

gulp.task('test', () =>
gulp.src('test/**/*.js')
.pipe(babel())
.pipe(mocha({
  compilers: 'babel-core/register',
  timeout: 100000
}))
);

gulp.task('coverage', ['test'], () =>
gulp.src('server/**/*.js')
.pipe(istanbul())
.pipe(istanbul.hookRequire())
.on('finish', () =>
gulp.src('test/**/*.js')
.pipe(istanbul.writeReports({
  dir: 'coverage',
  reporters: ['lcov'],
  reportOpts: { dir: 'coverage' }
})))
);

gulp.task('coveralls', ['coverage'], () =>
gulp.src('coverage/**/lcov.info')
.pipe(coveralls())
);
