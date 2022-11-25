import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { resolveUrl } from 'src/config'
import { post } from 'src/utils/broadcast'
import type { RootDescriptor } from '@ucenter/server'
import { createClient, HandlerFetchError } from 'typeful-fetch'
import { additional } from 'src/plugin/list'

export const authTokenId = useLocalStorage('authTokenId', '')
const authToken = useLocalStorage('authToken', '')
export const isLoggedIn = computed(() => !!authToken.value)

export const client = createClient<RootDescriptor>(resolveUrl('/'), () => {
  return {
    headers: {
      'x-auth-token': authToken.value
    }
  }
})

export type UserInfo = NonNullable<
  Awaited<ReturnType<typeof client['verify']['$post']['fetch']>>
>

export const userInfo = useLocalStorage<UserInfo>('userInfo', null as never, {
  deep: true
})

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

if (isLoggedIn.value) {
  await loadUserInfo().catch((err) => {
    if (err instanceof HandlerFetchError) {
      authToken.value = ''
      post('reload')
    }
  })
}
