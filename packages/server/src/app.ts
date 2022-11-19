import fastify from 'fastify'
import fastifyCors, { FastifyCorsOptions } from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import pino from 'pino'
import { DbConn, IDbConnOptions } from './db/index.js'
import { HookManager } from './hook/index.js'
import { IPluginManagerOptions, PluginManager } from './plugin/index.js'
import { Initable, PACKAGE_JSON } from './util/index.js'
import { ContributionManager } from './contribution/index.js'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { rootRouter } from './api/index.js'

declare module './contribution/index.js' {
  interface IHookMap {
    'post-contribution-setup': [ContributionManager]
    'post-dbconn-setup': [DbConn]
    'post-plugin-setup': [PluginManager]
    'post-server-setup': [App]
  }
}

declare module 'fastify' {
  export interface FastifyInstance {
    app: App
  }
}

export interface IAppOptions {
  db: IDbConnOptions
  plugins: IPluginManagerOptions
  openapi: boolean
  cors: FastifyCorsOptions
  host: string
  port: number
  static: string
  trustProxy: boolean | string | string[] | number
}

export class App extends Initable {
  contributions
  hooks
  dbconn
  plugins
  server

  constructor(public options: IAppOptions) {
    const logger = pino()
    super(logger)
    this.contributions = new ContributionManager()
    this.hooks = new HookManager({ logger })
    this.dbconn = new DbConn({ logger }, options.db)
    this.plugins = new PluginManager(
      { logger, hooks: this.hooks },
      options.plugins
    )
    const server = fastify({ logger, trustProxy: options.trustProxy })
    this.server = server.withTypeProvider<TypeBoxTypeProvider>()
    this.server.decorate('app', this as App)
  }

  async init() {
    await this.plugins.init()
    await this.hooks.fire('post-plugin-setup', this.plugins)
    await this.hooks.fire('post-contribution-setup', this.contributions)
    await this.dbconn.init()
    await this.hooks.fire('post-dbconn-setup', this.dbconn)
    if (this.options.openapi) {
      const { default: swagger } = await import('@fastify/swagger')
      await this.server.register(swagger, {
        openapi: {
          info: {
            title: 'UCenter Server',
            description: 'UCenter Server API',
            version: PACKAGE_JSON.version
          }
        }
      })
      const { default: ui } = await import('@fastify/swagger-ui')
      await this.server.register(ui, {
        routePrefix: '/docs'
      })
    }
    await this.server.register(fastifyCors, this.options.cors)
    await this.server.register(rootRouter.toPlugin())
    await this.hooks.fire('post-server-setup', this)
    await this.server.register(fastifyStatic, {
      root: this.options.static
    })
    await this.server.listen({
      host: this.options.host,
      port: this.options.port
    })
    this.logger.info('App started')
  }
}
