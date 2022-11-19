import { IUserAuthSources } from './index.js'
import { ContributionPoint } from './base.js'
import { TSchema } from '@sinclair/typebox'

export interface IUserAuthSourcesMeta {
  description: string
  schema: TSchema
}

export class UserAuthSources extends ContributionPoint<
  IUserAuthSources,
  IUserAuthSourcesMeta
> {
  constructor() {
    super()
  }
}
