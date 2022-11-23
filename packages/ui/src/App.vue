<template>
  <NConfigProvider :locale="locale" :date-locale="dateLocale">
    <NNotificationProvider placement="bottom-right">
      <NLayout position="absolute">
        <AppHeader />
        <AppContent />
        <AppFooter />
      </NLayout>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import {
  NLayout,
  NNotificationProvider,
  NConfigProvider,
  zhCN,
  dateZhCN,
  enUS,
  dateEnUS
} from 'naive-ui'
import AppHeader from 'src/components/AppHeader.vue'
import AppContent from 'src/components/AppContent.vue'
import AppFooter from 'src/components/AppFooter.vue'
import { lang } from 'src/utils/locale'
import { computed } from 'vue'

const locale = computed(() => {
  switch (lang.value) {
    case 'zh':
      return zhCN
    default:
      return enUS
  }
})
const dateLocale = computed(() => {
  switch (lang.value) {
    case 'zh':
      return dateZhCN
    default:
      return dateEnUS
  }
})
</script>
