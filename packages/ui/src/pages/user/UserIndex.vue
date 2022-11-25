<template>
  <div>
    <NSpin :show="save.loading.value">
      <NSkeleton text :repeat="5" v-if="info.loading.value" />
      <AttrView
        v-else-if="info.state.value"
        :title="$t('user-info')"
        :attrs="userInfo.attributes ?? {}"
        :props="info.state.value.attrs"
        use-i18n
        @update="update"
      >
        <template #before>
          <td class="w-24">ID</td>
          <td>
            <code>{{ userInfo._id }}</code>
          </td>
        </template>
      </AttrView>
    </NSpin>
  </div>
</template>

<script setup lang="ts">
import { NSkeleton, NSpin } from 'naive-ui'
import { client, userInfo } from 'src/api'
import AttrView, { IAttrProp, Attrs } from 'src/components/AttrView.vue'
import { useAsyncState, useAsyncTask } from 'src/compose/async'

const info = useAsyncState(async () => {
  const contrib = await client.user.user_attributes.$get.fetch()
  const attrs: Record<string, IAttrProp> = Object.fromEntries(
    Object.entries(contrib).map(([k, { allowUserEdit, ...v }]) => [
      k,
      { ...v, readonly: !allowUserEdit }
    ])
  )

  return { attrs }
}, null)

info.run()

const save = useAsyncTask(async (attr: Attrs) => {
  await client.user.attribute.$put.body(attr).fetch()
  userInfo.value.attributes = await client.user.attribute.$get.fetch()
})

function update(attr: Attrs) {
  save.run(attr)
}
</script>
