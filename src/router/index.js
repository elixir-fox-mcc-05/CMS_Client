import Vue from 'vue'
import VueRouter from 'vue-router'
// import NavBar from '../views/Navbar'
import Login from '../views/login'
import register from '../views/register'
import adminLogin from '../views/adminLogin'
import AdminDashboard from '../views/admindashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home'
    // component: NavBar
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: register
  },
  {
    path: '/adminP4C5D9de2sr',
    name: 'AdminLogin',
    component: adminLogin
  },
  {
    path: '/sdaslj332432',
    name: 'AdminDashboard',
    component: AdminDashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
