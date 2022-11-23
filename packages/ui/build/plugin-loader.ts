import { Plugin } from 'vite'
import dotenv from 'dotenv'

interface IPluginLoaderContext {
  plugins: string[]
}

function generateModule(ctx: IPluginLoaderContext, id: string) {
  if (id === '') return generatePluginsModule(ctx)
}

function generatePluginsModule(ctx: IPluginLoaderContext): string {
  let code = ''
  const { plugins } = ctx
  const n = plugins.length
  for (let i = 0; i < n; i++) {
    const plugin = plugins[i]
    code += `import plugin_${i} from '${plugin}/ui'\n`
  }
  code += 'export default [\n'
  for (let i = 0; i < n; i++) {
    code += `  plugin_${i},\n`
  }
  code += ']\n'
  return code
}

export function pluginLoader(): Plugin {
  dotenv.config()
  const targets = JSON.parse(process.env.UI_PLUGINS ?? '[]')
  if (!(targets instanceof Array))
    throw new Error('UI_PLUGINS must be an array')

  const ctx: IPluginLoaderContext = {
    plugins: targets
  }
  const prefix = 'virtual:plugins'

  return {
    name: 'plugin-loader',
    resolveId(id) {
      if (id.startsWith(prefix)) {
        return '\0' + id
      }
    },
    load(id) {
      if (id.startsWith('\0' + prefix)) {
        return generateModule(ctx, id.substring(prefix.length + 1))
      }
    }
  }
}
