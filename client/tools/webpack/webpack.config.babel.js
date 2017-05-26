import merge from 'webpack-merge'
import requireDir from 'require-dir'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

// Locals Paths
import { main, client } from '../paths'

// Tasks
const tasks = requireDir('./')

// Environments
const envConfig = dotenv.parse(fs.readFileSync('.env'))

const common = merge([
  {
    entry: {
      main: main.input.path
    },
    output: {
      filename: main.output.filename,
      path: main.output.path
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        images: path.resolve('./modules/global/images/')
      }
    }
  }
])

export default (env) => {
  switch (env.target) {
    case 'production':
      return merge([
        common,
        // env variables
        tasks.utils.environment(envConfig),
        // provide plugin
        tasks.utils.providers({
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery',
          'window.jQuery': 'jquery'
        }),
        // sourcemaps
        tasks.utils.sourcemaps('cheap-module-eval-source-map'),
        // views
        tasks.views.template(client.views.input.path),
        tasks.views.components(client.views.input.path),
        // fonts
        tasks.fonts.run(),
        // styles
        tasks.styles.production(client.main, client.styles.purify),
        // hmr
        tasks.utils.hmr(),
        // scripts
        tasks.scripts.lint(),
        tasks.scripts.extractBundles([{
          name: 'vendor',
          minChunks: tasks.scripts.isVendor
        }]),
        tasks.scripts.run('./modules/tsconfig.json', client.main),
        tasks.scripts.plugins(),
        // images
        tasks.images.url(),
        tasks.images.svg(),
        // revision
        tasks.utils.attachRevision()
      ])
    default:
      return merge([
        common,
        // env variables
        tasks.utils.environment(envConfig),
        // provide plugin
        tasks.utils.providers({
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery',
          'window.jQuery': 'jquery'
        }),
        // sourcemaps
        tasks.utils.sourcemaps('eval-source-map'),
        // views
        tasks.views.template(client.views.input.path),
        tasks.views.components(client.views.input.path),
        // fonts
        tasks.fonts.run(),
        // styles
        tasks.styles.run(client.main),
        // hmr
        tasks.utils.hmr(),
        // server
        tasks.server.run(client.server),
        // scripts
        tasks.scripts.lint(),
        tasks.scripts.run('./modules/tsconfig.json', client.main),
        tasks.scripts.plugins(),
        // images
        tasks.images.url(),
        tasks.images.svg()
      ])
  }
}
