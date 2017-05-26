import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import cdn from 'express-simple-cdn'

export const components = (include) => {
  return {
    module: {
      rules: [
        {
          test: /\.pug$/,
          include,
          use: [
            {
              loader: 'apply-loader'
            },
            {
              loader: 'pug-loader',
              query: {
                doctype: 'html',
                plugins: ['pug-plugin-ng']
              }
            }
          ]
        }
      ]
    }
  }
}

export const template = (exclude) => {
  return {
    module: {
      rules: [
        {
          test: /\.pug$/,
          exclude,
          use: [
            {
              loader: 'pug-loader',
              query: {
                doctype: 'html',
                plugins: ['pug-plugin-ng']
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve('./modules/global/templates/index.client.page.pug'),
        title: 'HS Starter Simple',
        inject: false,
        CDN: (path, useFileVersion) => {
          if (process.env.NODE_ENV === 'development') {
            return path
          }
          if (useFileVersion === undefined || useFileVersion === false) {
            return cdn(path, process.env.CDN_URL, process.env.CDN_VERSION)
          }
          return cdn(path, process.env.CDN_URL, process.env.CDN_VERSION)
        },
        __env: {
          name: process.env.NODE_ENV
        }
      })
    ]
  }
}
