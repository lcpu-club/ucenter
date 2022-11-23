import { createRequire } from 'module'
import { join, normalize } from 'path'
import { Logger } from 'pino'
import { HookManager } from '../hook/index.js'
import { APP_ROOT, Initable, WORKSPACE_ROOT } from '../util/index.js'

export type Plugin = (hooks: HookManager) => void | Promise<void>

const externalRequire = createRequire(
  normalize(join(WORKSPACE_ROOT, 'external', 'virtual-resolver.js'))
)
const pluginsRequire = createRequire(
  normalize(join(APP_ROOT, 'plugins', 'virtual-resolver.js'))
)

async function tryImport(id: string, require?: NodeRequire): Promise<unknown> {
  try {
    id = require ? require.resolve(id) : id
    return await import(id)
  } catch (err) {
    return null
  }
}

async function loadPlugin(id: string, external?: boolean): Promise<Plugin> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let plugin: any = await tryImport(id)
  if (external) {
    plugin ??= await tryImport(`./${id}`, externalRequire)
    plugin ??= await tryImport(id, externalRequire)
  }
  plugin ??= await tryImport(`./${id}`, pluginsRequire)
  plugin ??= await tryImport(id, pluginsRequire)
  if (plugin) return plugin.default as Plugin
  throw new Error(`Could not load plugin ${id}`)
}

export interface IPluginManagerInjects {
  logger: Logger
  hooks: HookManager
}

export interface IPluginManagerOptions {
  external: boolean
  plugins: string[]
}

export class PluginManager extends Initable {
  plugins: Plugin[] = []

  constructor(
    public injects: IPluginManagerInjects,
    public options: IPluginManagerOptions
  ) {
    super(injects.logger)
  }

  async setup() {
    for (const id of this.options.plugins) {
      const plugin = await loadPlugin(id, this.options.external)
      await plugin(this.injects.hooks)
      this.logger.info(`Loaded plugin ${id}`)
    }
  }
}
