<template>
  <NLayoutHeader bordered class="h-16 p-4 shadow flex items-center">
    <a v-if="config.brand" :href="config.brand.href">
      <img :src="config.brand.icon" class="app-logo" />
    </a>
    <NMenu mode="horizontal" :options="menuOptions" />
    <SpaceHelper />
    <UserIndicator />
    <LocaleIndicator />
  </NLayoutHeader>
</template>

<script setup lang="ts">
import { NLayoutHeader, NMenu, MenuOption } from 'naive-ui'
import { config } from 'src/config'
import { additionalFn } from 'src/plugin/list'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import LocaleIndicator from './LocaleIndicator.vue'
import SpaceHelper from './SpaceHelper.vue'
import UserIndicator from './UserIndicator.vue'

const { t } = useI18n()

const menuOptions: MenuOption[] = [
  {
    key: 'user-center',
    label: () => h(RouterLink, { to: '/user' }, () => t('user-center'))
  },
  ...additionalFn('mainMenu')
]
</script>

<style>
.app-logo {
  @apply h-6;
}
</style>
