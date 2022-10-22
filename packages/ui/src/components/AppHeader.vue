<template>
  <NLayoutHeader bordered class="h-16 p-4 shadow flex items-center">
    <router-link to="/">
      <div class="text-lg">User Center</div>
    </router-link>
    <SpaceHelper />
    <UserIndicator />
  </NLayoutHeader>
</template>

<script setup lang="ts">
import { NLayoutHeader } from 'naive-ui'
import SpaceHelper from './SpaceHelper.vue'
import UserIndicator from './UserIndicator.vue'
</script>
