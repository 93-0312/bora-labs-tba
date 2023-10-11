import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TbaDetail from '@/views/Detail.vue'
import NotFound from '@/components/service/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tba/:id',
      name: 'detail',
      component: TbaDetail
    },
    {
      path: '/:pathMach(.*)',
      name: 'notfound',
      component: NotFound
    }
  ]
})

export default router
