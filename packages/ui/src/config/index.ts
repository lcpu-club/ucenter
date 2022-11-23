import { additional } from 'src/plugin/list'

export interface IBrand {
  icon: string
  href: string
}

export interface ILoginMethod {
  name: string
  target?: string
  href?: string
}

export interface IRuntimeConfig {
  brand?: IBrand
  baseUrl: string
  loginMethods: ILoginMethod[]
}

export const config: IRuntimeConfig = {
  brand: {
    icon: '/ucenter-text.svg',
    href: '/'
  },
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  loginMethods: [...additional('loginMethods')]
}

export function resolveUrl(path: string) {
  let base = config.baseUrl
  if (base.endsWith('/')) base = base.slice(0, -1)
  if (path.startsWith('/')) path = path.slice(1)
  return base + '/' + path
}
