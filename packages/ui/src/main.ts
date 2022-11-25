import 'virtual:windi.css'
import 'virtual:windi-devtools'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { mergedMessages } from './utils/locale'
import { initApi } from './api'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: mergedMessages
})

initApi().then(() => {
  const app = createApp(App)
  app.use(i18n)
  app.use(router)
  app.mount('#app')
})
