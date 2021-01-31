import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/input',
    name: 'input',
    component: () => import('@/views/Input.vue')
  },
  {
    path: '/scroll',
    name: 'scroll',
    component: () => import('@/views/Scroll.vue')
  },
  {
    path: '/carousel',
    name: 'carousel',
    component: () => import('@/views/carousel-demo.vue')
  },
  {
    path: '/picker',
    name: 'picker',
    component: () => import('@/views/picker.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
