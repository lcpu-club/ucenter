import { TSchema, Type } from '@sinclair/typebox'
import { ContributionPoint } from './base.js'
import { IUserAttributes } from './index.js'

export interface IUserAttributesMeta {
  description: string
  allowUserEdit: boolean
  schema: TSchema
}

export class UserAttributes extends ContributionPoint<
  IUserAttributes,
  IUserAttributesMeta
> {
  constructor() {
    super()
    this.set('name', {
      schema: Type.String({ minLength: 5, maxLength: 32 }),
      allowUserEdit: true,
      description: 'Username'
    })
    this.set('nickname', {
      schema: Type.String({ minLength: 2, maxLength: 32 }),
      allowUserEdit: true,
      description: 'Nickname'
    })
    this.set('email', {
      schema: Type.String({ format: 'email' }),
      allowUserEdit: true,
      description: 'Email'
    })
  }
}
