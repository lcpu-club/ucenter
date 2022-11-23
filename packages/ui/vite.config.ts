import { defineConfig } from 'vite'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import WindiCSS from 'vite-plugin-windicss'
import { pluginLoader } from './build/plugin-loader'

export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      compositionOnly: true,
      include: join(__dirname, 'locales', '**')
    }),
    WindiCSS(),
    pluginLoader()
  ],
  resolve: {
    alias: {
      src: join(__dirname, 'src'),
      app: __dirname,
      root: join(__dirname, '..', '..')
    }
  },
  build: {
    target: 'esnext'
  }
})
