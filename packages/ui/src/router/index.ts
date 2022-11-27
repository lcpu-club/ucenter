import { isLoggedIn, userInfo } from 'src/utils'
import { additional } from 'src/plugin/list'
import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...additional('routes'),
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
        ...additional('userRoutes'),
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
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('src/pages/AdminPage.vue'),
      children: [
        ...additional('adminRoutes'),
        {
          name: 'admin',
          path: '',
          component: () => import('src/pages/admin/AdminIndex.vue')
        }
      ]
    },
    {
      path: '/about',
      component: () => import('src/pages/AboutPage.vue'),
      children: [
        ...additional('aboutRoutes'),
        {
          name: 'about',
          path: '',
          component: () => import('src/pages/about/AboutIndex.vue')
        }
      ]
    }
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
