import { useLocalStorage } from '@vueuse/core'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import plugins from 'src/plugin/list'

export const lang = useLocalStorage(
  'locale',
  import.meta.env.VITE_DEFAULT_LOCALE ?? 'en'
)

export const mergedMessages = [
  messages,
  ...plugins.map((plugin) => plugin.locales ?? {})
].reduce((acc, cur) => {
  for (const [key, value] of Object.entries(cur)) {
    Object.assign((acc[key] ??= {}), value)
  }
  return acc
}, {})
