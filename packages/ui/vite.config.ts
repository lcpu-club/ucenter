import { defineConfig } from 'vite'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { pluginLoader } from './build/plugin-loader'

export default defineConfig({
  plugins: [vue(), WindiCSS(), pluginLoader()],
  resolve: {
    alias: {
      src: join(__dirname, 'src'),
      app: __dirname
    }
  },
  build: {
    target: 'esnext'
  }
})
