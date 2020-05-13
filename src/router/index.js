import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Dashboard from '../views/Dashboard.vue'
import Product from '../components/Product.vue'
import ProductsTable from '../components/ProductsTable.vue'
import AddProduct from '../components/AddProduct.vue'
import ProductDetail from '../components/ProductDetail.vue'
import EditProduct from '../components/EditProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    children: [
      {
        path: 'show_all',
        name: 'ProductsTable',
        component: ProductsTable
      },
      {
        path: 'add_product',
        name: 'AddProduct',
        component: AddProduct
      },
      {
        path: ':id',
        name: 'ProductDetail',
        component: ProductDetail
      },
      {
        path: ':id/edit',
        name: 'EditProduct',
        component: EditProduct
      }
    ]
  },
  {
    path: '/customer',
    name: 'Customer',
    component: LandingPage
  },
  {
    path: '/order',
    name: 'Order',
    component: LandingPage
  },
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
