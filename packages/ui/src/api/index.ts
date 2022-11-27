import { post } from 'src/utils/broadcast'
import type { RootDescriptor } from '@ucenter/server'
import { HandlerFetchError } from 'typeful-fetch'
import { additional } from 'src/plugin/list'
import {
  createResolvedClient,
  authToken,
  authTokenId,
  isLoggedIn,
  userInfo
} from 'src/utils'

export const client = createResolvedClient<RootDescriptor>('/')

export async function loadUserInfo(token?: string) {
  const info = await client.verify.$post
    .body({
      token: token ?? authToken.value,
      policies: ['center:access', 'center:admin', ...additional('policies')]
    })
    .fetch()
  userInfo.value = info
}

export async function login(newAuthTokenId: string, newAuthToken: string) {
  await loadUserInfo(newAuthToken)
  authTokenId.value = newAuthTokenId
  authToken.value = newAuthToken
  post('reload')
}

export async function initApi() {
  if (isLoggedIn.value) {
    await loadUserInfo().catch((err) => {
      if (err instanceof HandlerFetchError) {
        authToken.value = ''
        post('reload')
      }
    })
  }
}
