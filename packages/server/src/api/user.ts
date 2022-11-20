import { Type } from '@sinclair/typebox'
import http from 'http-errors'
import { protectedChain } from './base.js'
import { check } from '../util/index.js'

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
  .handle('GET', '/attribute', (C) =>
    C.handler().handle(async (ctx) => {
      return ctx.user.attributes
    })
  )
  .handle('PUT', '/attribute', (C) =>
    C.handler()
      .body(Type.Record(Type.String(), Type.Any()))
      .handle(async (ctx, req) => {
        const entries = Object.entries(req.body)
        for (const [k, v] of entries) {
          const info = ctx.app.contributions.userAttributes.get(k)
          if (!info || !info.allowUserEdit) throw http.BadRequest()
          if (!check(info.schema, v)) throw http.BadRequest()
        }
        await ctx.dbconn.user.collection.updateOne(
          { _id: ctx.user._id },
          {
            $set: Object.fromEntries(
              entries.map(([k, v]) => [`attributes.${k}`, v])
            )
          }
        )
        return null
      })
  )
  .handle('GET', '/user_attributes', (C) =>
    C.handler().handle(async (ctx) => {
      return ctx.app.contributions.userAttributes.contributions
    })
  )
  .handle('GET', '/group_attributes', (C) =>
    C.handler().handle(async (ctx) => {
      return ctx.app.contributions.groupAttributes.contributions
    })
  )
