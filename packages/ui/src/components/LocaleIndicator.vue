<template>
  <div class="pl-2">
    <NButton @click="changeLocale" type="info" ghost>
      {{ t(locale) }}
    </NButton>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { lang } from 'src/utils/locale'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

watch(
  lang,
  (value) => {
    locale.value = value
  },
  { immediate: true }
)

function changeLocale() {
  lang.value = locale.value === 'en' ? 'zh' : 'en'
}
</script>
