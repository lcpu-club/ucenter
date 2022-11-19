import { TSchema, Type } from '@sinclair/typebox'
import { ContributionPoint } from './base.js'
import { IGroupPolicies } from './index.js'

export interface IGroupPoliciesMeta {
  description: string
  schema: TSchema
}

export class GroupPolicies extends ContributionPoint<
  IGroupPolicies,
  IGroupPoliciesMeta
> {
  constructor() {
    super()
    this.set('center:access', {
      description: 'Access UserCenter',
      schema: Type.Boolean()
    })
    this.set('center:admin', {
      description: 'Access UserCenter Administration',
      schema: Type.Boolean()
    })
  }
}
