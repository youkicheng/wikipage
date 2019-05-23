const path = require('path')
const BASE_URL = process.env.NODE_ENV === 'production' ? '/PackageWiki/' : '/'

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  baseUrl: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_v', resolve('src/views'))
  },
  productionSourceMap: false,
  devServer: {
    proxy: 'http://localhost:8524',
    host: '0.0.0.0',
    port: 8524
  }
}
