import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import feather from 'vue-icon'
import { BootstrapVue } from 'bootstrap-vue'
import '../../custom.scss'

Vue.use(BootstrapVue)
Vue.use(feather, 'v-icon')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../components/login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '../components/login/Register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
