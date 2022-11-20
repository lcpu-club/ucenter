<template>
  <div>
    <NSkeleton text :repeat="5" v-if="loading" />
    <AttrView
      v-else-if="state"
      title="Group Info"
      :attrs="state.group.attributes ?? {}"
      :props="state.attrs"
      readonly
    >
      <template #before>
        <td class="w-2">ID</td>
        <td>
          <code>{{ state.group._id }}</code>
        </td>
      </template>
    </AttrView>
  </div>
</template>

<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
import { client } from 'src/api'
import AttrView, { IAttrProp } from 'src/components/AttrView.vue'
import { useAsyncState } from 'src/compose/async'

const { state, loading, run } = useAsyncState(async () => {
  const contrib = await client.user.group_attributes.$get.fetch()
  const attrs: Record<string, IAttrProp> = Object.fromEntries(
    Object.entries(contrib).map(([k, { ...v }]) => [
      k,
      { ...v, readonly: true }
    ])
  )
  const group = await client.user.group.$get.fetch()

  return { attrs, group }
}, null)

run()
</script>
