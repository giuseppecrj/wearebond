export const run = (include) => {
  return {
    module: {
      rules: [
        {
          test: /\.(woff|woff2|ttf)(\?\S*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: 'fonts/[name].[ext]'
          }
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      ]
    }
  }
}
