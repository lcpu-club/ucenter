<template>
  <NLayoutFooter
    bordered
    position="absolute"
    class="px-4 h-8 flex items-center justify-between"
  >
    <div>{{ footerTextLeft }}</div>
    <a
      class="flex items-center"
      href="https://github.com/lcpu-club/ucenter"
      target="_blank"
    >
      <NIcon size="24">
        <UIcon :path="mdiGithub" />
      </NIcon>
    </a>
  </NLayoutFooter>
</template>

<script setup lang="ts">
import { NLayoutFooter, NIcon } from 'naive-ui'
import UIcon from 'src/components/UIcon.vue'
import { mdiGithub } from '@mdi/js'

const footerTextLeft = import.meta.env.VITE_FOOTER_TEXT_LEFT
</script>
