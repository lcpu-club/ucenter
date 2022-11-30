<template>
  <NLayoutHeader
    bordered
    position="absolute"
    class="h-16 shadow flex items-center z-10"
  >
    <div class="self-stretch overflow-x-auto">
      <div class="h-full flex items-center w-max-content">
        <div class="self-stretch px-4 border-r flex items-center">
          <a v-if="config.brand" :href="config.brand.href">
            <img :src="config.brand.icon" class="app-logo" />
          </a>
        </div>
        <NMenu mode="horizontal" :options="menuOptions" />
      </div>
    </div>
    <SpaceHelper />
    <UserIndicator />
    <LocaleIndicator class="pr-4" />
  </NLayoutHeader>
</template>

<script setup lang="ts">
import { NLayoutHeader, NMenu, MenuOption } from 'naive-ui'
import { config } from 'src/utils'
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
    key: 'home',
    label: () => h(RouterLink, { to: '/' }, () => t('home'))
  },
  ...additionalFn('mainMenu')
]
</script>

<style>
.app-logo {
  @apply h-6;
}

.w-max-content {
  width: max-content;
}
</style>
