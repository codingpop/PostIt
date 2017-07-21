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
  gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'babel-core/register',
      timeout: 100000
    }))
    .pipe(istanbul.hookRequire())
);

gulp.task('coverage', ['test'], () =>
  gulp.src('server/**/*.js')
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.writeReports())
);

gulp.task('coveralls', () =>
  gulp.src('coverage/lcov.info')
    .pipe(coveralls())
);
