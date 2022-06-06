import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Startseite',
      component: async () => {
        console.log("starseite")
        let view = await import('../views/Startseite/Index.vue')
        console.log(view)
        return view;
      }
    },
    {
      path: '/Statistiken',
      name: 'Statistiken',
      component: () => import('../views/Statistiken/Index.vue')
    },
    {
      path: '/Benachrichtigung',
      name: 'Benachrichtigung',
      component: () => import('../views/Benachrichtigung/Index.vue')
    },
    {
      path: '/Mitmachen',
      name: 'Mitmachen',
      component: () => import('../views/Mitmachen/Index.vue')
    }
  ]
})

export default router
