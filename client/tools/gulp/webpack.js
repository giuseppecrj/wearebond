import gulp from 'gulp'
import webpack from 'webpack'
import webpackClientConfig from '../webpack/webpack.config.babel'

import { options } from '../paths'

gulp.task('webpack:client', (done) => {
  webpack(webpackClientConfig(options.env), options.onBuild(done))
})
