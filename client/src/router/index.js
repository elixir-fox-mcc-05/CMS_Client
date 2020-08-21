import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Dashboard from '../views/DashboardViews.vue'
import Products from '../views/ProductViews.vue'
import Orders from '../views/OrderViews.vue'
import Customers from '../views/CustomerViews.vue'
import Reports from '../views/ReportViews.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Landing
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
