import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Dashboard from '../views/Dashboard.vue'
import ProductList from '../components/ProductList.vue'
import DetailProduct from '../views/DetailProduct.vue'
import CategoryList from '../components/CategoryList.vue'
import Forbidden from '../views/Forbidden.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    redirect: {
      name: 'Products'
    },
    children: [
      {
        name: 'Products',
        path: 'products',
        component: ProductList
      },
      {
        name: 'ProductDetail',
        path: 'products/:id',
        component: DetailProduct
      },
      {
        path: 'categories',
        component: CategoryList
      }
    ]
  },
  {
    path: 'forbidden',
    name: 'Forbidden',
    component: Forbidden
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
