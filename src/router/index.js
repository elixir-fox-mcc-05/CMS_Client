import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import mainPage from '../views/mainPage.vue'
import Register from '../views/Register.vue'
import AddProduct from '../views/AddProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/mainPage',
    name: 'MainPage',
    component: mainPage
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/AddProduct',
    name: 'AddProduct',
    component: AddProduct
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
