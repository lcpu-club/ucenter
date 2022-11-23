<template>
  <NSpace>
    <router-link v-slot="{ navigate }" to="/login" custom>
      <NButton @click="navigate">{{ $t('login') }}</NButton>
    </router-link>
  </NSpace>
</template>

<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
</script>
