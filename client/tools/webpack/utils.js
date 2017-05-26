import webpack from 'webpack'
import GitRevisionPlugin from 'git-revision-webpack-plugin'

export const sourcemaps = (devtool) => {
  return {
    devtool
  }
}

export const attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version()
    })
  ]
})

export const providers = (prov) => ({
  plugins: [
    new webpack.ProvidePlugin(prov)
  ]
})

export const environment = (envConfig) => {
  let env = Object.keys(envConfig)
    .map((key) => {
      let newKey = 'process.env.' + key
      return {
        [newKey]: envConfig[key]
      }
    })
    .reduce((acc, variable) => {
      for (let key in variable) acc[key] = JSON.stringify(variable[key])
      return acc
    }, {})

  Object.assign(env, { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  }
}

export const hmr = (options) => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ]
})
