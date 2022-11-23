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
      name: 'about',
      path: '/about',
      component: () => import('src/pages/AboutPage.vue')
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
    {
      path: '/admin',
      component: () => import('src/pages/AdminPage.vue'),
      children: [
        {
          name: 'admin',
          path: '',
          component: () => import('src/pages/admin/AdminIndex.vue')
        },
        ...additional('adminRoutes')
      ]
    },
    {
      path: '/about',
      component: () => import('src/pages/AboutPage.vue'),
      children: [
        {
          name: 'about',
          path: '',
          component: () => import('src/pages/about/AboutIndex.vue')
        },
        ...additional('aboutRoutes')
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
