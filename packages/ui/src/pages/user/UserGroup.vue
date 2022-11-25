<template>
  <div>
    <NSkeleton text :repeat="5" v-if="loading" />
    <template v-else-if="state">
      <AttrView
        :title="$t('group-info')"
        :attrs="state.group.attributes ?? {}"
        :props="state.attrs"
        readonly
        use-i18n
      >
        <template #before>
          <td class="w-24">ID</td>
          <td>
            <code>{{ state.group._id }}</code>
          </td>
        </template>
      </AttrView>
      <NDivider />
      <AttrView
        :title="$t('group-policies')"
        :attrs="state.group.policies ?? {}"
        :props="state.policies"
        readonly
      >
        <template #before>
          <td class="w-24">Scope</td>
          <td>Value</td>
        </template>
      </AttrView>
    </template>
  </div>
</template>

<script setup lang="ts">
import { NSkeleton, NDivider } from 'naive-ui'
import { client } from 'src/api'
import AttrView, { IAttrProp } from 'src/components/AttrView.vue'
import { useAsyncState } from 'src/compose/async'

const { state, loading, run } = useAsyncState(async () => {
  const rawAttrs = await client.user.group_attributes.$get.fetch()
  const attrs: Record<string, IAttrProp> = Object.fromEntries(
    Object.entries(rawAttrs).map(([k, { ...v }]) => [
      k,
      { ...v, readonly: true }
    ])
  )
  const rawPolicies = await client.user.group_policies.$get.fetch()
  const policies: Record<string, IAttrProp> = Object.fromEntries(
    Object.entries(rawPolicies).map(([k, { ...v }]) => [
      k,
      { ...v, readonly: true }
    ])
  )
  const group = await client.user.group.$get.fetch()

  return { attrs, policies, group }
}, null)

run()
</script>
