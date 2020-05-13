import Vue from 'vue'
import VueRouter from 'vue-router'
// import NavBar from '../views/Navbar'
import Login from '../views/login'
import register from '../views/register'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
