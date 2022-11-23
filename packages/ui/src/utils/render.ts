import { NIcon } from 'naive-ui'
import { h } from 'vue'
import UIcon from 'src/components/UIcon.vue'

export function renderIcon(path: string) {
  return () =>
    h(NIcon, null, {
      default: () => h(UIcon, { path })
    })
}
