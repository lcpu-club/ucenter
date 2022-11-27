import { createResolvedClient } from '@ucenter/ui/src/utils'
import type { PasswordAuthDescriptor } from '../../src'

export const client =
  createResolvedClient<PasswordAuthDescriptor>('/auth/password/')
