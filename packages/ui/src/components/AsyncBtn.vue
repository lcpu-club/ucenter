<template>
  <NButton v-bind="$props" :loading="loading" @click="run">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </NButton>
</template>

<script lang="ts">
import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import { useAsyncTask } from 'src/compose/async'

export default defineComponent({
  name: 'AsyncBtn',
  components: {
    NButton
  },
  extends: NButton,
  props: {
    task: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const task = useAsyncTask(props.task as () => Promise<unknown>)
    return {
      ...task
    }
  }
})
</script>
