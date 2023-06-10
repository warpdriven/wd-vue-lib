const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  // lintOnSave: process.env.NODE_ENV === "development",
  lintOnSave:false,
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      "/api/": {
        // target: "http://localhost:9999",
        target: "http://192.168.1.2",
        // target: "https://stg.woolworlds.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/nuwa/": {
        target: "https://data-stg.warp-driven.com",
        changeOrigin: true,
        pathRewrite: {
          "^/nuwa": "",
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
  },
});
