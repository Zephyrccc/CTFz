import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'


const pathSrc = path.resolve(__dirname, 'src')


export default defineConfig({
    resolve: {
        alias: {
            '~/': `${pathSrc}/`,
        },
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            // allow auto load markdown components under `./src/components/`
            extensions: ['vue'],
            // allow auto import and register components used in markdown
            include: [/\.vue$/, /\.vue\?vue/],
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            dts: 'src/components.d.ts',
        }),
        ElementPlus({}),
    ],
    server: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true
                // pathRewrite: {
                //   '^/api': ''
                // }
            },
            '/file': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true
                // pathRewrite: {
                //   '^/api': ''
                // }
            }
        }
    },
})
