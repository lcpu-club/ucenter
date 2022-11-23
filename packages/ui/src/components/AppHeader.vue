<template>
  <NLayoutHeader bordered class="h-16 p-4 shadow flex items-center">
    <a v-if="config.brand" :href="config.brand.href">
      <img :src="config.brand.icon" class="app-logo" />
    </a>
    <NMenu mode="horizontal" :options="menuOptions" />
    <SpaceHelper />
    <UserIndicator />
  </NLayoutHeader>
</template>

<script setup lang="ts">
import { NLayoutHeader, NMenu, MenuOption } from 'naive-ui'
import { config } from 'src/config'
import { additional } from 'src/plugin/list'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import SpaceHelper from './SpaceHelper.vue'
import UserIndicator from './UserIndicator.vue'

const menuOptions: MenuOption[] = [
  {
    key: 'user-center',
    label: () => h(RouterLink, { to: '/' }, () => 'User Center')
  },
  ...additional('mainMenu')
]
</script>

<style>
.app-logo {
  @apply h-6;
}
</style>
