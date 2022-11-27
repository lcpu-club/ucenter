<template>
  <div>
    <div class="flex justify-between border-b-2 mb-4 pb-4">
      <div class="text-xl">{{ $t('password') }}</div>
    </div>
    <div class="text-lg border-b mb-2">{{ $t('change-password') }}</div>
    <NSpace vertical>
      <NInput
        v-model:value="password"
        type="password"
        :placeholder="$t('password')"
      />
      <AsyncBtn :task="doChange" type="primary">
        {{ $t('submit') }}
      </AsyncBtn>
    </NSpace>
  </div>
</template>

<script setup lang="ts">
import AsyncBtn from '@ucenter/ui/src/components/AsyncBtn.vue'
import { NDivider, NSpace, NButton, NInput } from 'naive-ui'
import { ref } from 'vue'
import { client } from './api'

const password = ref('')

async function doChange() {
  await client.user.set.$put
    .body({
      password: password.value
    })
    .fetch()
}
</script>
