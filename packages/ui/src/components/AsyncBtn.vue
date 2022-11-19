<template>
  <NButton v-bind="$props" :loading="loading" @click="handleClick">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </NButton>
</template>

<script lang="ts">
import { NButton, useNotification } from 'naive-ui'
import { defineComponent, ref } from 'vue'

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
    const loading = ref(false)
    const notification = useNotification()

    const handleClick = async () => {
      loading.value = true
      try {
        const result = await props.task()
        if (typeof result === 'string') {
          notification.success({
            content: result,
            duration: 3000
          })
        } else if (result !== false) {
          notification.success({
            content: 'Operation succeeded',
            duration: 3000
          })
        }
      } catch (err) {
        notification.error({
          title: 'Error',
          description: `${err}`
        })
      }
      loading.value = false
    }

    return {
      loading,
      handleClick
    }
  }
})
</script>
