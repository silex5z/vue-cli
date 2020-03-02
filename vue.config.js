module.exports = {
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
  configureWebpack: {
    devtool: 'source-map',
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-cli/' : '/'
}
