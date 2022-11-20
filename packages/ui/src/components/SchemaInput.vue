<template>
  <NInput
    :value="value"
    @update:value="onUpdate"
    :readonly="props.readonly"
    :placeholder="props.description"
  ></NInput>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NInput } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps<{
  schema: any
  readonly: boolean
  description: string
  value: any
}>()

const emits = defineEmits<{
  (e: 'update:value', value: any): void
}>()

const value = computed(() => props.value)
function onUpdate(value: any) {
  emits('update:value', value)
}
</script>
