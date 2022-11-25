<template>
  <div>
    <div class="pb-4 flex justify-between">
      <div class="text-xl">{{ $t('access-tokens') }}</div>
      <div></div>
    </div>
    <hr />
    <NList>
      <NListItem v-for="(token, i) of tokens" :key="i">
        <NThing>
          <template #avatar>
            <NAvatar>
              <NIcon>
                <UIcon :path="mdiKey" />
              </NIcon>
            </NAvatar>
          </template>
          <template #header>{{ token.type }} Token</template>
          {{ token.description }}
          <NDescriptions label-placement="left" :columns="1">
            <NDescriptionsItem label="Created At">
              {{ new Date(token.createdAt).toLocaleString() }}
            </NDescriptionsItem>
            <NDescriptionsItem label="Expires At">
              {{ new Date(token.expiresAt).toLocaleString() }}
            </NDescriptionsItem>
            <NDescriptionsItem label="Used At">
              {{ new Date(token.usedAt).toLocaleString() }}
            </NDescriptionsItem>
          </NDescriptions>
          <NSpace>
            <NTag v-for="(prefix, i) of token.prefixes" :key="i">
              <code>{{ prefix }}</code>
            </NTag>
          </NSpace>
          <template #action>
            <NSpace>
              <AsyncBtn
                :task="deleteToken(token._id)"
                size="small"
                type="error"
                :disabled="token._id === authTokenId"
              >
                <template #icon>
                  <NIcon>
                    <UIcon :path="mdiDelete" />
                  </NIcon>
                </template>
                Revoke
              </AsyncBtn>
            </NSpace>
          </template>
        </NThing>
      </NListItem>
    </NList>
  </div>
</template>

<script lang="ts" setup>
import {
  NList,
  NListItem,
  NThing,
  NAvatar,
  NIcon,
  NSpace,
  NTag,
  NDescriptions,
  NDescriptionsItem
} from 'naive-ui'
import { authTokenId, client } from 'src/api'
import { ref } from 'vue'
import UIcon from 'src/components/UIcon.vue'
import AsyncBtn from 'src/components/AsyncBtn.vue'
import { mdiKey, mdiDelete } from '@mdi/js'

async function getTokens() {
  return client.user.token.$get.fetch()
}

function deleteToken(_id: string) {
  return async () => {
    await client.user.token.$delete.body({ _id }).fetch()
    tokens.value = await getTokens()
  }
}

const tokens = ref<Awaited<ReturnType<typeof getTokens>>>([])

getTokens().then((res) => {
  tokens.value = res
})
</script>
