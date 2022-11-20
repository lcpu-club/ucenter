import { GetRouterDescriptor } from 'fastify-typeful'
import { rootRouter } from './api/index.js'

export type RootDescriptor = GetRouterDescriptor<typeof rootRouter>

export * from './app.js'
export * from './api/index.js'
export * from './config/index.js'
export * from './contribution/index.js'
export * from './db/index.js'
export * from './hook/index.js'
export * from './plugin/index.js'
export * from './script/index.js'
export * from './util/index.js'
