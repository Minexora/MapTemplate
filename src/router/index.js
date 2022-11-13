import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { isUserLoggedIn, checkPerm } from '@/auth/utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  if (checkPerm(to)) {
    if (!isLoggedIn) return next({ name: 'login' })

    // If logged in => not authorized
    return next({ name: 'error-404' })
  }

  // Redirect if logged in
  if (to.name === 'login') {
    if (isLoggedIn) {
      return next({ name: 'home' })
    }

    return next()
  }
  if (isLoggedIn) {
    return next()
  }
  return next({ name: 'login' })
})

export default router
