<template>
  <div class="p-16 w-full flex justify-center items-start">
    <NLayout class="border">
      <NLayoutHeader bordered class="p-4">
        <div class="text-lg">Admin</div>
      </NLayoutHeader>
      <NLayout has-sider>
        <NLayoutSider bordered width="128">
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
import { h } from 'vue'
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

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/admin/'
        },
        () => 'Home'
      ),
    key: 'home'
  },
  ...additionalFn('adminMenu')
]
</script>
