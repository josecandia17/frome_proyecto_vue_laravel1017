import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VistaLogin from '../views/LoginView.vue'
import AppLayout from '@/layout/AppLayout.vue';
import Categoria from '@/views/admin/Categoria.vue'
import Producto from '@/views/admin/Producto.vue'
import Cliente from '@/views/admin/Cliente.vue'
import Usuario from '@/views/admin/Usuario.vue'
import NuevoPedido from '@/views/admin/pedido/NuevoPedido.vue'
import ListaPedido from '@/views/admin/pedido/ListaPedido.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: VistaLogin,
      meta: {redirectIfAuth: true}
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {requireAuth: true}
        },
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
          meta: {requireAuth: true}
        },
        {
          path: 'categoria',
          name: 'Categoria',
          component: Categoria,
          meta: {requireAuth: true}
        },
        {
          path: 'producto',
          name: 'Producto',
          component: Producto,
          meta: {requireAuth: true}
        },
        {
          path: 'pedido/nuevo',
          name: 'PedidoNuevo',
          component: NuevoPedido,
          meta: {requireAuth: true}
        },
        {
          path: 'pedido',
          name: 'PedidoLista',
          component: ListaPedido,
          meta: {requireAuth: true}
        },
        {
          path: 'cliente',
          name: 'Cliente',
          component: Cliente,
          meta: {requireAuth: true}
        },
        {
          path: 'usuario',
          name: 'Usuario',
          component: Usuario,
          meta: {requireAuth: true}
        }
      ]
    }
  ]
})

// Guard
router.beforeEach((to, from, next) =>{
  let token = localStorage.getItem("access_token")

  if(to.meta.requireAuth) {
    if(!token)
      return next({name: 'login'});
    return next()
  }

  if(to.meta.redirectIfAuth && token) {
    return next({name: 'about'})
  }

  return next()
})



export default router

