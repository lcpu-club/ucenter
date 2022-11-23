<template>
  <div class="w-full h-full flex justify-center items-center">
    <div>
      <NCard hoverable :segmented="{ content: true }">
        <template #header>
          <div class="text-2xl font-bold">Password Login</div>
        </template>
        <NSpace vertical>
          <n-input
            v-model:value="username"
            type="text"
            placeholder="Username"
          />
          <n-input
            v-model:value="password"
            type="password"
            placeholder="Password"
          />
        </NSpace>
        <template #action>
          <NButton class="w-full" type="primary" @click="login">Login</NButton>
        </template>
      </NCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NCard, NSpace, NInput, NButton, useNotification } from 'naive-ui'
import { ref } from 'vue'
import { createClient } from 'typeful-fetch'
import { resolveUrl } from '@ucenter/ui/src/config'
import { post } from '@ucenter/ui/src/utils/broadcast'
import type { PasswordAuthDescriptor } from '../../src'

const notification = useNotification()

const username = ref('')
const password = ref('')

const client = createClient<PasswordAuthDescriptor>(
  resolveUrl('/auth/password/')
)

async function login() {
  try {
    const { _id, value } = await client.login.$post
      .body({
        username: username.value,
        password: password.value
      })
      .fetch()
    localStorage.setItem('authTokenId', _id)
    localStorage.setItem('authToken', value)
    post('reload')
  } catch (err) {
    notification.error({
      content: `${err}`,
      duration: 3000
    })
  }
}
</script>
