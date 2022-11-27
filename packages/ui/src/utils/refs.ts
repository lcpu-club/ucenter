import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import type { client } from 'src/api'

export const authTokenId = useLocalStorage('authTokenId', '')
export const authToken = useLocalStorage('authToken', '')
export const isLoggedIn = computed(() => !!authToken.value)
export type UserInfo = NonNullable<
  Awaited<ReturnType<typeof client['verify']['$post']['fetch']>>
>
export const userInfo = useLocalStorage<UserInfo>('userInfo', null as never, {
  deep: true
})
