import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    name: 'Home',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/ShoppingApp.vue'),
  },
  {
    path: '/administrator',
    name: 'Administrator',
    component: () => import('../views/administrator/Administrator.vue'),
  },
  {
    path: '/employee',
    name: 'Employee',
    component: () => import('../views/administrator/employee/Employee.vue'),
  },
  {
    path: '/new',
    name: 'New',
    component: () => import('../views/login/NewUser.vue'),
  }


  // {
  //   path: '/shoppingapp',
  //   name: 'Shoppingapp',
  //   redirect: '/purchase',
  //   component: () => import('../views/ShoppingApp.vue'),
  //   children: [{
  //     path: '/purchase',
  //     name: 'Purchase',
  //     component: () => import('../views/purchase/Purchase.vue')
  //   },
  //     {
  //       path: '/mine',
  //       name: 'Mine',
  //       component: () => import('../views/mine/Mine.vue')
  //     },
  //     {
  //       path: '/sell',
  //       name: 'sell',
  //       component: () => import('../views/sell/Sell.vue')
  //     },
  //     {
  //       path: '/shopping',
  //       name: 'Shopping',
  //       component: () => import('../views/shopping/Shopping.vue')
  //   },]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // to 要去的
  // from 在哪来
  // next 运行函数
  if (to.path == '/login')
    return next()
  if (!store.state.tel) {
    next('/login')
  } else {
    next()
  }
})

export default router
