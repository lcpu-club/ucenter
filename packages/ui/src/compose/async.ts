import { useNotification } from 'naive-ui'
import { Ref, ref } from 'vue'

export function useAsyncState<T, A extends Array<unknown>>(
  task: (...args: A) => Promise<T>,
  initial: T
) {
  const state = ref<T>(initial) as Ref<T>
  const error = ref<Error>()
  const loading = ref(false)
  const run = async (...args: A) => {
    if (loading.value) return
    loading.value = true
    try {
      state.value = await task(...args)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err
      } else {
        error.value = new Error(`${err}`)
      }
    }
    loading.value = false
  }
  return { state, error, loading, run }
}

export function useAsyncTask<A extends Array<unknown>>(
  task: (...args: A) => Promise<unknown>
) {
  const loading = ref(false)
  const notification = useNotification()
  const run = async (...args: A) => {
    if (loading.value) return
    loading.value = true
    try {
      const result = await task(...args)
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
  return { loading, run }
}
