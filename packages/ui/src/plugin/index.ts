import { RouteRecordRaw } from 'vue-router'
import { ILoginMethod } from 'src/config'
import { MenuOption } from 'naive-ui'

export interface UIPlugin {
  name: string
  routes?: RouteRecordRaw[]
  userRoutes?: RouteRecordRaw[]
  loginMethods?: ILoginMethod[]
  mainMenu?: MenuOption[]
  userMenu?: MenuOption[]
}

export function definePlugin(plugin: UIPlugin): UIPlugin {
  return plugin
}
