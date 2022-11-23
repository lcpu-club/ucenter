import { Type } from '@sinclair/typebox'
import http from 'http-errors'
import { apiChain } from './base.js'

export const publicRouter = apiChain.router().handle('POST', '/verify', (C) =>
  C.handler()
    .body(
      Type.Object({
        token: Type.String(),
        policies: Type.Array(Type.String(), {
          minItems: 1,
          maxItems: 50
        })
      })
    )
    .handle(async (ctx, req) => {
      const info = await ctx.dbconn.token.loadUserInfo(
        req.body.token,
        <never>req.body.policies
      )
      if (!info) throw http.Unauthorized()
      return info
    })
)
