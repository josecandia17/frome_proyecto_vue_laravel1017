import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VistaLogin from '../views/LoginView.vue'
import AppLayoutVue from '@/layout/AppLayout.vue'
import CategoriaVue from '@/views/admin/Categoria.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [


    {
      path: '/login',
      name: 'login',
      component: VistaLogin,
      meta: { redirectIfAuth: true }
    },
    {
      path: '/',
      component: AppLayoutVue,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: { requireAuth: true }
        },
        {
          path: 'about',
          name: 'about',

          component: () => import('../views/AboutView.vue'),
          meta: { requireAuth: true }
        },
        {
          path: 'categoria',
          name: 'Categoria',
          component: CategoriaVue,
          meta:{requireAuth:true}
        }
      ]
    }
  ]
})

//guard

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("access_token")

  if (to.meta.requireAuth) {
    if (!token)
      return next({ name: 'login' });
    return next()
  }

  if (to.meta.redirectIfAuth && token) {
    return next({ name: 'about' })
  }

  return next()
})

export default router
