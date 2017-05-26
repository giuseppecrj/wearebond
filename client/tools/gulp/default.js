import gulp from 'gulp'
import runSequence from 'run-sequence'

gulp.task('build', (done) => {
  if (process.env.NODE_ENV === 'development') {
    runSequence('delete', 'default', done)
  } else {
    runSequence('delete', 'webpack:client', done)
  }
})

gulp.task('default', (done) => {
  runSequence(['browser-sync', 'json-server'], done)
})

gulp.task('notify', ['slack'], () => {
  console.log(`
    Project successfully launched: ${process.env.DOCKER_URL},
    Version: ${process.env.CDN_VERSION}
  `)
})
