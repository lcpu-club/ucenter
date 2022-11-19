import { Type } from '@sinclair/typebox'
import bcrypt from 'bcrypt'
import { GetRouterDescriptor } from 'fastify-typeful'
import http from 'http-errors'
import { rootChain } from '../api/base.js'
import type { Plugin } from '../index.js'
import { askString } from '../util/index.js'

declare module '../contribution/index.js' {
  interface IUserAuthSources {
    password: {
      hash: string
    }
  }
}

const router = rootChain.router().handle('POST', '/login', (C) =>
  C.handler()
    .body(
      Type.Object({
        username: Type.String(),
        password: Type.String()
      })
    )
    .handle(async ({ dbconn }, req) => {
      const { username, password } = req.body
      const user = await dbconn.user.collection.findOne(
        { 'attributes.username': username },
        {
          projection: {
            _id: 1,
            'authSources.password': 1
          }
        }
      )
      if (!user || !user.authSources.password) throw http.Unauthorized()
      const result = await bcrypt.compare(
        password,
        user.authSources.password.hash
      )
      if (!result) throw http.Unauthorized()
      const info = await dbconn.token.createCenterToken(user._id)
      return info
    })
)

export type PasswordAuthDescriptor = GetRouterDescriptor<typeof router>

const plugin: Plugin = (hooks) => {
  hooks.hook('post-plugin-setup', ({ logger }) => {
    logger.info('Setting up password auth plugin')
  })
  hooks.hook('post-contribution-setup', (contrib) => {
    contrib.userAuthSources.set('password', {
      description: 'Password Login',
      schema: Type.Object({
        hash: Type.String()
      })
    })
  })
  hooks.hook('post-dbconn-setup', async (dbconn) => {
    await dbconn.user.collection.createIndex(
      { 'attributes.username': 1 },
      { unique: true }
    )
  })
  hooks.hook('post-script-setup', (scripts) => {
    scripts.addScript('password:set-password', async (app) => {
      const username = await askString('Username')
      const user = await app.dbconn.user.collection.findOne(
        { 'attributes.username': username },
        { projection: { _id: 1 } }
      )
      if (!user) {
        console.log('User not found')
        return
      }
      const password = await askString('Password')
      const hash = await bcrypt.hash(password, 10)
      await app.dbconn.user.setAuthSource(user._id, 'password', { hash })
    })
  })
  hooks.hook('post-server-setup', (app) => {
    app.server.register(router.toPlugin(), { prefix: '/auth/password' })
  })
}

export default plugin
