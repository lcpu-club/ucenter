import { Logger } from 'pino'
import { App } from '../app.js'

export type Script = (app: App) => Promise<void>

export interface IScriptManagerInjects {
  logger: Logger
}

export class ScriptManager {
  logger
  scripts: Record<string, Script> = Object.create(null)

  constructor(public injects: IScriptManagerInjects) {
    this.logger = injects.logger
  }

  addScript(name: string, main: Script) {
    if (name in this.scripts) {
      throw new Error(`Script ${name} already exists`)
    }
    this.scripts[name] = main
  }

  async run(script: string, app: App) {
    if (!(script in this.scripts)) {
      console.log(`Script ${script} does not exist`)
      console.log('Available scripts:')
      console.log(Object.keys(this.scripts).join('\n'))
      process.exit(1)
    }
    const start = Date.now()
    let failed = false
    try {
      await this.scripts[script](app)
    } catch (err) {
      console.error(err)
      failed = true
    }
    const end = Date.now()
    const duration = ((end - start) / 1000).toFixed(1)
    console.log(`Script ${script} finished in ${duration}s`)
    process.exit(failed ? 1 : 0)
  }
}
