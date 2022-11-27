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
export const tokenLoadedChain = apiChain.transform(async (ctx, req) => {
  const value = req.headers['x-auth-token']
  if (typeof value !== 'string') throw http.Unauthorized()
  const token = await ctx.dbconn.token.get({ value })
  if (!token) throw http.Unauthorized()
  return { ...ctx, token }
})
export const userLoadedChain = tokenLoadedChain.transform(async (ctx) => {
  const user = await ctx.dbconn.user.loadUserInfo(ctx.token, [
    'center:access',
    'center:admin'
  ])
  return { ...ctx, user }
})
export const protectedChain = userLoadedChain.transform(async (ctx) => {
  if (!ctx.user.group.policies['center:access']) {
    throw http.Unauthorized()
  }
  return ctx
})
export const adminChain = userLoadedChain.transform(async (ctx) => {
  if (!ctx.user.group.policies['center:admin']) {
    throw http.Unauthorized()
  }
  return ctx
})
