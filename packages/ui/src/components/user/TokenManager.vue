<template>
  <NList>
    <NListItem v-for="(token, i) of tokens" :key="i">
      <NThing></NThing>
    </NListItem>
  </NList>
</template>

<script lang="ts" setup>
import { NList, NListItem, NThing } from 'naive-ui'
import { client } from 'src/api'
import { ref } from 'vue'

async function getTokens() {
  return client.user.tokens.$get.fetch()
}

const tokens = ref<Awaited<ReturnType<typeof getTokens>>>([])

getTokens().then((res) => {
  tokens.value = res
})
</script>
