const { defineConfig } = require('@vue/cli-service')
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
  lintOnSave: false,   //加入此行 , false为关闭true为开启
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        utils: '@/utils',
        network:'@/network',
        router:'@/router',
        store:'@/store',
        types:'@/types',
        views: '@/views'
      }
    },
    // 前端跨域
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          // pathRewrite: {
          //   '^/api': ''
          // }
        }
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
})
