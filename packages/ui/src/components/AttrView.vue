<template>
  <div class="pb-4 flex justify-between">
    <div class="text-xl">{{ props.title }}</div>
    <div>
      <NButton
        v-if="!readonly"
        @click="edit = !edit"
        :type="edit ? 'primary' : 'default'"
      >
        Edit
      </NButton>
    </div>
  </div>
  <NTable single-column :single-line="false">
    <tbody>
      <slot name="before" />
      <tr v-for="key of keys" :key="key">
        <td v-if="props.useI18n">
          {{ $t(key) }}
        </td>
        <td v-else>
          <code>{{ key }}</code>
        </td>
        <template v-if="edit">
          <td>
            <SchemaInput
              :schema="props.props[key].schema"
              :readonly="props.props[key].readonly"
              :description="props.props[key].description"
              v-model:value="newAttrs[key]"
            />
          </td>
        </template>
        <template v-else>
          <td v-if="key in props.attrs">{{ props.attrs[key] }}</td>
          <td v-else><i>Not set</i></td>
        </template>
      </tr>
    </tbody>
  </NTable>
  <NSpace v-if="edit" class="pt-4">
    <NButton :disabled="!edit" type="primary" @click="save">Save</NButton>
    <NButton :disabled="!edit" type="error" @click="reset">Reset</NButton>
  </NSpace>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NButton, NTable, NSpace } from 'naive-ui'
import { computed, ref } from 'vue'
import SchemaInput from 'src/components/SchemaInput.vue'

export interface IAttrProp {
  schema: any
  readonly: boolean
  description: string
}

export type Attrs = Record<string, any>

const edit = ref(false)

const props = defineProps<{
  title: string
  attrs: Attrs
  props: Record<string, IAttrProp>
  readonly?: boolean
  useI18n?: boolean
}>()

const emits = defineEmits<{
  (e: 'update', value: Attrs): void
}>()

const keys = computed(() => Object.keys(props.props))
const newAttrs = ref<Attrs>({})
function reset() {
  newAttrs.value = JSON.parse(JSON.stringify(props.attrs))
}
reset()

function save() {
  emits('update', newAttrs.value)
  edit.value = false
}
</script>
