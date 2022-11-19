import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { getUrl } from 'src/config'
import { post } from 'src/utils/broadcast'
import type { RootDescriptor } from '@ucenter/server'
import { createClient, HandlerFetchError } from 'typeful-fetch'

export const authTokenId = useLocalStorage('authTokenId', '')
const authToken = useLocalStorage('authToken', '')
export const isLoggedIn = computed(() => !!authToken.value)

export const client = createClient<RootDescriptor>(getUrl('/'), () => {
  return {
    headers: {
      'x-auth-token': authToken.value
    }
  }
})

async function getUserInfo() {
  try {
    return await client.verify.$post
      .body({
        token: authToken.value,
        policies: ['center:access', 'center:admin']
      })
      .fetch()
  } catch (err) {
    if (err instanceof HandlerFetchError) {
      authToken.value = ''
      post('reload')
    }
  }
  return null
}

export type UserInfo = NonNullable<Awaited<ReturnType<typeof getUserInfo>>>

export const userInfo = useLocalStorage<UserInfo>('userInfo', null as never, {
  deep: true
})

if (isLoggedIn.value) {
  const info = await getUserInfo()
  info && (userInfo.value = info)
}
