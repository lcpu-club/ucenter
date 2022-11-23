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
import { ScriptManager } from './script/index.js'

declare module './contribution/index.js' {
  interface IHookMap {
    'post-plugin-setup': [App]
    'pre-dbconn-setup': [App]
    'post-dbconn-setup': [App]
    'pre-server-setup': [App]
    'post-server-setup': [App]
    'post-started': [App]
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
  cors: FastifyCorsOptions
  host: string
  port: number
  static: string
  trustProxy: boolean | string | string[] | number
}

export class App extends Initable {
  version: string = PACKAGE_JSON.version
  contributions
  hooks
  dbconn
  plugins
  server
  scripts

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
    this.scripts = new ScriptManager({ logger })
  }

  async _init() {
    await this.plugins.init()
    await this.hooks.fire('post-plugin-setup', this)
    await this.hooks.fire('pre-dbconn-setup', this)
    await this.dbconn.init()
    await this.hooks.fire('post-dbconn-setup', this)
  }

  async start() {
    await this.init()
    await this.hooks.fire('pre-server-setup', this)
    await this.server.register(fastifyCors, this.options.cors)
    await this.server.register(rootRouter.toPlugin())
    await this.server.register(fastifyStatic, {
      root: this.options.static
    })
    await this.hooks.fire('post-server-setup', this)
    await this.server.listen({
      host: this.options.host,
      port: this.options.port
    })
    this.logger.info('App started')
    await this.hooks.fire('post-started', this)
  }

  async exec(script: string) {
    await this.init()
    return this.scripts.run(script, this)
  }
}
