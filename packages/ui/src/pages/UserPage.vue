<template>
  <div class="p-16 <lg:p-1 w-full flex justify-center items-start">
    <NLayout class="border">
      <NLayoutHeader bordered class="p-4">
        <div class="text-lg">{{ $t('user-center') }}</div>
      </NLayoutHeader>
      <NLayout has-sider>
        <NLayoutSider
          bordered
          width="180"
          collapse-mode="width"
          :show-trigger="smallerThanLg || collapsed"
          v-model:collapsed="collapsed"
        >
          <NMenu :options="menuOptions" />
        </NLayoutSider>
        <NLayoutContent class="p-4">
          <RouterView v-slot="{ Component }">
            <Transition name="router" mode="out-in">
              <component :is="Component" />
            </Transition>
          </RouterView>
        </NLayoutContent>
      </NLayout>
    </NLayout>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  MenuOption,
  NLayoutContent
} from 'naive-ui'
import { additionalFn } from 'src/plugin/list'
import { renderIcon } from 'src/utils'
import { mdiAccount, mdiAccountGroup, mdiKey, mdiCircle } from '@mdi/js'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanLg = breakpoints.smaller('lg')
const collapsed = ref(smallerThanLg.value)
const { t } = useI18n()

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/user/'
        },
        () => t('user-info')
      ),
    key: 'info',
    icon: renderIcon(mdiAccount)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/user/group'
        },
        () => t('user-group')
      ),
    key: 'group',
    icon: renderIcon(mdiAccountGroup)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/user/token'
        },
        () => t('user-token')
      ),
    key: 'token',
    icon: renderIcon(mdiKey)
  },
  ...additionalFn('userMenu')
].map((option) => {
  option.icon ??= renderIcon(mdiCircle)
  return option
})
</script>
