import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import coveralls from 'gulp-coveralls';

gulp.task('transpile', () =>
gulp.src(['server/**/*.js'])
.pipe(babel())
.pipe(gulp.dest('dist/server')));

gulp.task('transpile-test', () =>
gulp.src('test/**/*.js')
.pipe(babel())
.pipe(gulp.dest('dist/test'))
);

gulp.task('test', ['transpile', 'transpile-test'], () =>
gulp.src('dist/test/**/*.js')
.pipe(mocha({ timeout: 100000 }))
);

gulp.task('coverage', ['test'], () =>
gulp.src('dist/server/**/*.js')
.pipe(istanbul({ includeUntested: true }))
.pipe(istanbul.hookRequire())
.on('finish', () =>
gulp.src('dist/test/**/*.js')
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
