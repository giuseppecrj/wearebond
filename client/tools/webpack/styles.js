import ExtractTextPlugin from 'extract-text-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import PurifyCSSPlugin from 'purifycss-webpack'
import path from 'path'
import glob from 'glob'

const sassLoader = {
  data: `$env: ${process.env.NODE_ENV};$cdn: "${process.env.CDN_VERSION}";`,
  includePaths: [path.resolve('./modules/global/sass')],
  sourceMap: true
}

const styleLint = new StyleLintPlugin({
  syntax: 'sugarss',
  files: './modules/**/*.sass'
})

export const run = (include) => ({
  module: {
    rules: [
      {
        test: /\.sass$/,
        include,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: sassLoader
          }
        ]
      }
    ]
  },
  plugins: [
    styleLint
  ]
})

export const production = (exclude) => ({
  module: {
    rules: [
      {
        test: /\.sass$/,
        exclude,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader?sourceMap'
            },
            {
              loader: 'postcss-loader?sourceMap=inline'
            },
            {
              loader: 'sass-loader?sourceMap',
              options: sassLoader
            }
          ]
        })
      }
    ]
  },
  plugins: [
    styleLint,
    new ExtractTextPlugin({
      filename: 'stylesheets/[name].css'
    }),
    new PurifyCSSPlugin({
      moduleExtensions: [
        '.html',
        '.pug',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.css',
        '.sass',
        '.scss'
      ],
      paths: glob.sync(path.resolve('./modules/**/*.{pug,html,ts}')),
      purifyOptions: {
        minify: true,
        info: true,
        whitelist: ['*slick*']
      }
    })
  ]
})
