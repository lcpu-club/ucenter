import { definePlugin } from '@ucenter/ui/src/plugin'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default definePlugin({
  name: 'password',
  routes: [
    {
      name: 'password-login',
      path: '/login/password',
      component: () => import('./PasswordLogin.vue')
    }
  ],
  loginMethods: [
    // Password login
    { name: 'login-by-password', target: '/login/password' }
  ],
  userMenu: () => {
    const { t } = useI18n()
    return [
      {
        key: 'password',
        label: () =>
          h(RouterLink, { to: '/user/password' }, () => t('password'))
      }
    ]
  },
  userRoutes: [
    {
      path: 'password',
      component: () => import('./UserPassword.vue')
    }
  ],
  locales: {
    en: {
      password: 'Password',
      'login-by-password': 'Password',
      'change-password': 'Change Password'
    },
    zh: {
      password: '密码',
      'login-by-password': '密码登录',
      'change-password': '修改密码'
    }
  }
})
