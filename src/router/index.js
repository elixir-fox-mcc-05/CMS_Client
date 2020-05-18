import Vue from 'vue'
import VueRouter from 'vue-router'
import adminLogin from '../views/adminLogin'
import AdminDashboard from '../views/admindashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Home',
    component: AdminDashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: adminLogin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
