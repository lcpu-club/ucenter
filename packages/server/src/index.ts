import { GetRouterDescriptor } from 'fastify-typeful'
import { rootRouter } from './api/index.js'

export type RootDescriptor = GetRouterDescriptor<typeof rootRouter>

export { App } from './app.js'
export { Plugin } from './plugin/index.js'
export { IUser, IGroup, IToken, ISystem } from './db/index.js'
export {
  IUserAuthSources,
  IUserAttributes,
  IGroupAttributes,
  IGroupPolicies
} from './contribution/index.js'
