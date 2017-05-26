import path from 'path'
import plugins from 'gulp-load-plugins'
import notifier from 'node-notifier'

const $ = plugins()

export const options = {
  env: {
    target: process.env.NODE_ENV
  },
  minify: process.env.NODE_ENV === 'production',
  onBuild: (done, logOptions = {}) => {
    return (err, stats) => {
      if (err) throw new $.util.PluginError('webpack', err)
      $.util.log(`[webpack]: ${stats.toString(logOptions)}`)
      if (stats.compilation.errors.length) {
        notifier.notify({
          title: `[webpack]: ${stats.compilation.errors[1].name}`,
          subtitle: `${stats.compilation.errors[1].message}`,
          message: `${stats.compilation.errors[0]}`,
          contentImage: `${__dirname}/assets/logo.png`
        })
      }

      if (done) {
        done()
      }
    }
  }
}

export const main = {
  input: {
    path: path.resolve('./modules/main.ts')
  },
  output: {
    path: path.resolve('./public'),
    filename: 'javascripts/[name].js'
  }
}

export const client = {
  main: path.resolve('./modules'),
  server: {
    contentBase: path.resolve('./public'),
    port: 3000
  },
  styles: {
    purify: {
      input: {
        path: path.resolve('./modules/**/*.{pug,html,ts}')
      }
    }
  },
  views: {
    input: {
      path: [path.resolve('./modules/app')]
    }
  }
}
