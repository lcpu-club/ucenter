import { definePlugin } from '@ucenter/ui/src/plugin'
import { h } from 'vue'
import { RouterLink } from 'vue-router'

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
    { name: 'Password', target: '/login/password' }
  ],
  userMenu: [
    {
      key: 'password',
      label: () => h(RouterLink, { to: '/user/password' }, () => 'Password')
    }
  ],
  userRoutes: [
    {
      path: 'password',
      component: () => import('./UserPassword.vue')
    }
  ]
})
