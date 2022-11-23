import plugins from 'virtual:plugins'
import { UIPlugin } from './index'

export default plugins

type ArrayType<T> = {
  [P in keyof T as T[P] extends Array<unknown> | undefined
    ? P
    : never]-?: T[P] extends Array<infer U> | undefined ? Array<U> : never
}
type UIPluginArraySub = ArrayType<UIPlugin>

export function additional<T extends keyof UIPluginArraySub>(
  key: T
): UIPluginArraySub[T] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return plugins.flatMap((plugin: any) => plugin[key] ?? [])
}