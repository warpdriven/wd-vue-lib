const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/api/': {
        target: "https://stg.woolworlds.com",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/nuwa/': {
        target: "https://data-stg.warp-driven.com",
        changeOrigin: true,
        pathRewrite: {
          '^/nuwa': ''
        }
      }
    }
  }
})
