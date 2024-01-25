import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

import DefaultLayout from '@/layouts/DefaultLayout'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=>import('../views/login/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: DefaultLayout,      
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/dashboard/Dashboard.vue'),
          meta: { requireAuth: true }
        },
        {
          path: '/carteira',
          name: 'carteira',
          component: () => import('../views/carteira/Carteira.vue'),
          meta: { requireAuth: true }
    
        },
        {
          path: '/ordens',
          name: 'ordens',
          component: () => import('../views/ordens/Ordens.vue'),
          meta: { requireAuth: true }
    
        },
        {
          path: '/book',
          name: 'book',
          component: () => import('../views/book/BookOfertas.vue')
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      
      component: () => import('../views/register/Register.vue')
    },    
  ]
})

  router.beforeEach((to, from, next) => {
     next()
     if (to.matched.some((record) => record.meta.requireAuth)) {
       if (localStorage.getItem('token') == null) {
         next({
           path: '/',
         });
       } else {
         next();
       }
     } else {
       next();
     }
   });
   
   
   router.beforeResolve((to,from,next)=>{
     if(to.name){
       NProgress.start()
     }
     next()
   })
   router.afterEach((to,from)=>{
     NProgress.done()
   })
   
   export default router
