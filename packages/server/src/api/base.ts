import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { createRoot } from 'fastify-typeful'
import http from 'http-errors'

export const rootChain = createRoot<TypeBoxTypeProvider>().transform(
  (_, req) => {
    const app = req.server.app
    return {
      app,
      dbconn: app.dbconn
    }
  }
)

export const rootBuilder = rootChain.router()

export const apiChain = rootBuilder.asRoot()
export const protectedChain = apiChain.transform(async (ctx, req) => {
  const value = req.headers['x-auth-token']
  if (typeof value !== 'string') throw http.Unauthorized()
  const token = await ctx.dbconn.token.get({ value })
  if (!token) throw http.Unauthorized()
  const user = await ctx.dbconn.user.loadUserInfo(token, [
    'center:access',
    'center:admin'
  ])
  return { ...ctx, token, user }
})
export const adminChain = protectedChain.transform(async (ctx) => {
  if (!ctx.user.group.policies['center:admin']) {
    throw http.Unauthorized()
  }
  return ctx
})
