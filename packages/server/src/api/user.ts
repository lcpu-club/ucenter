import { Type } from '@sinclair/typebox'
import http from 'http-errors'
import { protectedChain } from './base.js'

export const userRouter = protectedChain
  .router()
  .handle('GET', '/group', (C) =>
    C.handler().handle(async (ctx) => {
      return ctx.dbconn.group.get({ _id: ctx.user.group._id })
    })
  )
  .handle('GET', '/token', (C) =>
    C.handler().handle(async (ctx) => {
      return ctx.dbconn.token.list({ userId: ctx.user._id })
    })
  )
  .handle('DELETE', '/token', (C) =>
    C.handler()
      .body(Type.Object({ _id: Type.String() }))
      .handle(async (ctx, req) => {
        await ctx.dbconn.token.collection.deleteOne({ _id: req.body._id })
        return null
      })
  )
  .handle('POST', '/token', (C) =>
    C.handler()
      .body(
        Type.Object({
          type: Type.Union([Type.Literal('app')]),
          prefixes: Type.Array(Type.String()),
          description: Type.String(),
          expiresAt: Type.Number()
        })
      )
      .handle(async (ctx, req) => {
        const value = await ctx.dbconn.token.create({
          userId: ctx.user._id,
          ...req.body
        })
        return value
      })
  )
  .handle('PUT', '/attribute', (C) =>
    C.handler()
      .body(
        Type.Object({
          key: Type.String(),
          value: Type.Any()
        })
      )
      .handle(async (ctx, req) => {
        const { key, value } = req.body
        const info = ctx.app.contributions.userAttributes.get(key)
        if (!info || !info.allowUserEdit) throw http.BadRequest()
        // TODO: Type check the value
        await ctx.dbconn.user.collection.updateOne(
          { _id: ctx.user._id },
          {
            $set: { [`attributes.${key}`]: value }
          }
        )
      })
  )
