import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader'],
      }
    ]
  }
})
