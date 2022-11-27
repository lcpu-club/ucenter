<template>
  <NSpace align="center">
    <NDropdown :options="options" trigger="hover">
      <NTag size="large" :color="{ color: 'transparent' }">
        <template #avatar>
          <NAvatar :src="gravatar(userInfo.attributes.email ?? '')" />
        </template>
        {{ userInfo.attributes.nickname ?? userInfo.attributes.name }}
      </NTag>
    </NDropdown>
  </NSpace>
</template>

<script setup lang="ts">
import { NAvatar, NTag, NSpace, NDropdown, DropdownOption } from 'naive-ui'
import { userInfo } from 'src/utils'
import { post } from 'src/utils/broadcast'
import { useI18n } from 'vue-i18n'
import { renderIcon } from 'src/utils/render'
import { mdiLogout, mdiAccount, mdiHammerWrench, mdiInformation } from '@mdi/js'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { gravatar } from 'src/utils/gravatar'

const { t } = useI18n()

const options: DropdownOption[] = [
  {
    key: 'user',
    label: () => h(RouterLink, { to: '/user' }, () => t('user-info')),
    icon: renderIcon(mdiAccount)
  },
  {
    key: 'admin',
    label: () => h(RouterLink, { to: '/admin' }, () => t('admin-console')),
    icon: renderIcon(mdiHammerWrench),
    show: userInfo.value?.group?.policies?.['center:admin']
  },
  {
    key: 'about',
    label: () => h(RouterLink, { to: '/about' }, () => t('about-ui')),
    icon: renderIcon(mdiInformation)
  },
  {
    key: 'logout',
    label: () => t('logout'),
    icon: renderIcon(mdiLogout),
    props: {
      onClick: logout
    }
  }
]

function logout() {
  localStorage.removeItem('authToken')
  post('reload')
}
</script>
