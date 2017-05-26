import gulp from 'gulp'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import plugins from 'gulp-load-plugins'

import { main, client } from '../paths'
import webpackConfig from '../webpack/webpack.config.babel'

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const $ = plugins()

gulp.task('browser-sync', () => {
  let env = {
    target: process.env.NODE_ENV
  }

  let config = webpackConfig(env)

  config.entry.main = [ 'webpack-hot-middleware/client?reload=true' ].concat(main.input.path)

  const compiler = webpack(config)

  browserSync({
    port: client.server.port,
    open: false,
    middleware: [
      webpackDevMiddleware(compiler, {
        noInfo: true,
        stats: {
          colors: true
        },
        publicPath: config.output.publicPath
      }),
      webpackHotMiddleware(compiler)
    ]
  })
})
