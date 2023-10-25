import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Index.vue'
import TbaDetail from '@/views/Detail.vue'
import NotFound from '@/components/service/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tba/721/:id',
      name: 'detail721',
      component: TbaDetail,
      meta: {
        type: 721
      }
    },
    {
      path: '/tba/1155/:id',
      name: 'detail1155',
      component: TbaDetail,
      meta: {
        type: 1155
      }
    },
    {
      path: '/tba/6551/:id',
      name: 'detail6551',
      component: TbaDetail,
      meta: {
        type: 6551
      }
    },
    {
      path: '/:pathMach(.*)',
      name: 'notfound',
      component: NotFound
    }
  ]
})

export default router
