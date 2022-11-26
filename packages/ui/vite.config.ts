import { config } from 'dotenv'
import { defineConfig } from 'vite'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import WindiCSS from 'vite-plugin-windicss'
import {
  getPluginDirs,
  getPluginTargets,
  pluginLoader
} from './build/plugin-loader'

config()

function checkEnv(name: string, value?: string) {
  if (!value && !process.env[name]) throw new Error(`Missing env ${name}`)
  process.env[name] ??= value
}

checkEnv('VITE_API_BASE_URL')
checkEnv('VITE_BRAND_ICON', '/ucenter-text.svg')
checkEnv('VITE_BRAND_HREF', '/')
checkEnv('VITE_GRAVATAR_URL', 'https://www.gravatar.com/avatar/')
checkEnv('VITE_DEFAULT_LOCALE', 'en')
checkEnv('VITE_FOOTER_TEXT_LEFT', 'Linux Club of Peking University')

const plugins = getPluginTargets()

export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      compositionOnly: true,
      include: join(__dirname, 'locales', '**')
    }),
    WindiCSS({
      scan: {
        dirs: [join(__dirname, 'src'), ...getPluginDirs(plugins)]
      }
    }),
    pluginLoader(plugins)
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
