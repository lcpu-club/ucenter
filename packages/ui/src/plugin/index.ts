import { RouteRecordRaw } from 'vue-router'
import { ILoginMethod } from 'src/config'
import { MenuOption } from 'naive-ui'
import * as api from 'src/api'

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

export { api }
