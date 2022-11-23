import { isLoggedIn, userInfo } from 'src/api'
import { additional } from 'src/plugin/list'
import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'index',
      path: '/',
      component: () => import('src/pages/IndexPage.vue')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('src/pages/LoginPage.vue')
    },
    {
      path: '/user',
      component: () => import('src/pages/UserPage.vue'),
      children: [
        {
          name: 'user',
          path: '',
          component: () => import('src/pages/user/UserIndex.vue')
        },
        {
          path: 'group',
          component: () => import('src/pages/user/UserGroup.vue')
        },
        {
          path: 'token',
          component: () => import('src/pages/user/UserToken.vue')
        },
        ...additional('userRoutes')
      ]
    },
    ...additional('routes')
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = isLoggedIn.value
  const access = loggedIn && userInfo.value.group.policies['center:access']
  const admin = loggedIn && userInfo.value.group.policies['center:admin']
  const prefix = (str: string) => to.path.startsWith(str)
  if (prefix('/login') && loggedIn) {
    return next({ path: '/' })
  }
  if (prefix('/user') && !access) {
    return next({ path: '/' })
  }
  if (prefix('/admin') && !admin) {
    return next({ path: '/' })
  }
  return next()
})
