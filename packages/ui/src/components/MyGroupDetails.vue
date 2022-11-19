<template>
  <GroupDetails v-if="group" :group="group" />
  <div v-else class="w-full flex justify-center">
    <NSpin />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NSpin } from 'naive-ui'
import { client } from 'src/api'
import GroupDetails from './GroupDetails.vue'
import type { IGroup } from '@ucenter/server'

const group = ref<IGroup>()

client.user.group.$get.fetch().then((res) => {
  group.value = res
})
</script>
