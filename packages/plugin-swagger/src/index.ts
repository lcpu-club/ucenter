import type { Plugin } from '@ucenter/server'
import ui from '@fastify/swagger-ui'
import swagger from '@fastify/swagger'

const plugin: Plugin = (hooks) => {
  hooks.hook('pre-server-setup', async (app) => {
    await app.server.register(swagger.default, {
      openapi: {
        info: {
          title: 'UCenter Server',
          description: 'UCenter Server API',
          version: app.version
        }
      }
    })
    await app.server.register(ui.default, {
      routePrefix: '/docs'
    })
  })
}

export default plugin
