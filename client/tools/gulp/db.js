import gulp from 'gulp'
import plugins from 'gulp-load-plugins'

const $ = plugins()

gulp.task('json-server', $.shell.task(['json-server --watch db/db.json --routes db/routes.json --port 3005']))
