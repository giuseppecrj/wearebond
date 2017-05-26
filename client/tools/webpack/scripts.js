import webpack from 'webpack'
import path from 'path'
import ModernizrWebpackPlugin from 'modernizr-webpack-plugin'
import { CheckerPlugin } from 'awesome-typescript-loader'

export const lint = (include) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'standard-loader',
        include
      }
    ]
  }
})

export const extractBundles = (bundles) => ({
  plugins: bundles.map(bundle => (new webpack.optimize.CommonsChunkPlugin(bundle)))
})

export const isVendor = ({ resource }) =>
  resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/)

export const run = (configFileName, include) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include,
        exclude: /node_modules/,
        options: {
          configFileName
        }
      }
    ]
  }
})

export const plugins = (include) => ({
  plugins: [
    new CheckerPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve('./modules/client'),
      {}
    ),
    new ModernizrWebpackPlugin({
      options: [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testProp',
        'fnBind'
      ],
      'feature-detects': [
        'css/transitions',
        'touchevents'
      ],
      filename: 'javascripts/modernizr.js',
      minify: process.env.NODE_ENV === 'production'
    })
  ]
})

export const minify = ({ useSourceMap }) => {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: useSourceMap,
        mangle: {
          keep_fnames: true
        },
        compress: {
          warnings: false
        }
      })
    ]
  }
}
