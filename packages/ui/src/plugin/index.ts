import { RouteRecordRaw } from 'vue-router'
import { ILoginMethod } from 'src/utils'
import { MenuOption } from 'naive-ui'

export interface UIPlugin {
  name: string
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
  policies?: string[]
}

export function definePlugin(plugin: UIPlugin): UIPlugin {
  return plugin
}
