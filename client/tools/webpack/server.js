export const run = (options) => {
  return {
    devServer: {
      historyApiFallback: true,
      contentBase: options.contentBase,
      stats: 'errors-only',
      port: options.port
    }
  }
}
