import { createClient, RouterDescriptor } from 'typeful-fetch'
import { authToken } from './refs'

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
}

export const config: IRuntimeConfig = {
  brand: {
    icon: import.meta.env.VITE_BRAND_ICON,
    href: import.meta.env.VITE_BRAND_HREF
  },
  baseUrl: import.meta.env.VITE_API_BASE_URL
}

export function resolveUrl(path: string) {
  let base = config.baseUrl
  if (base.endsWith('/')) base = base.slice(0, -1)
  if (path.startsWith('/')) path = path.slice(1)
  return base + '/' + path
}

export function createResolvedClient<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  R extends RouterDescriptor<any> = RouterDescriptor<{}>
>(base: string) {
  return createClient<R>(resolveUrl(base), () => {
    return {
      headers: {
        'x-auth-token': authToken.value
      }
    }
  })
}
