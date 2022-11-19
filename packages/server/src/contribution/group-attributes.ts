import { TSchema, Type } from '@sinclair/typebox'
import { ContributionPoint } from './base.js'
import { IGroupAttributes } from './index.js'

export interface IGroupAttributesMeta {
  schema: TSchema
  description: string
}

export class GroupAttributes extends ContributionPoint<
  IGroupAttributes,
  IGroupAttributesMeta
> {
  constructor() {
    super()
    this.set('name', {
      schema: Type.String(),
      description: 'Username'
    })
  }
}
