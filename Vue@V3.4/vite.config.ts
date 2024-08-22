import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    // alias: {
    //   '@': fileURLToPath(new URL('./src', import.meta.url)),
    //   '~': path.resolve(__dirname, './node_modules')
    // }
    alias: [
      // { find: '~', replacement: path.resolve(__dirname, '../node_modules') },
      // { find: /^~/, replacement: '' },
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${resolve(__dirname, 'src/index.less')}";`
      }
    }
  }
})
