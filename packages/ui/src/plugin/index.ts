import { RouteRecordRaw } from 'vue-router'
import { ILoginMethod } from 'src/config'
import { MenuOption } from 'naive-ui'

export interface UIPlugin {
  name: string
  index?: NonNullable<RouteRecordRaw['component']>
  routes?: RouteRecordRaw[]
  userRoutes?: RouteRecordRaw[]
  adminRoutes?: RouteRecordRaw[]
  aboutRoutes?: RouteRecordRaw[]
  loginMethods?: ILoginMethod[]
  locales?: Record<string, Record<string, string>>
  mainMenu?: () => MenuOption[]
  userMenu?: () => MenuOption[]
  adminMenu?: () => MenuOption[]
  aboutMenu?: () => MenuOption[]
}

export function definePlugin(plugin: UIPlugin): UIPlugin {
  return plugin
}
