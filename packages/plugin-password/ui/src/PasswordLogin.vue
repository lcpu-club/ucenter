<template>
  <div class="w-full pt-20 flex justify-center items-center">
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
          <NButton class="w-full" type="primary" @click="onLogin">
            Login
          </NButton>
        </template>
      </NCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NCard, NSpace, NInput, NButton, useNotification } from 'naive-ui'
import { ref } from 'vue'
import { createClient } from 'typeful-fetch'
import { login } from '@ucenter/ui/src/api'
import { resolveUrl } from '@ucenter/ui/src/config'
import type { PasswordAuthDescriptor } from '../../src'

const notification = useNotification()

const username = ref('')
const password = ref('')

const client = createClient<PasswordAuthDescriptor>(
  resolveUrl('/auth/password/')
)

async function onLogin() {
  try {
    const { _id, value } = await client.login.$post
      .body({
        username: username.value,
        password: password.value
      })
      .fetch()
    await login(_id, value)
  } catch (err) {
    notification.error({
      content: `${err}`,
      duration: 3000
    })
  }
}
</script>
