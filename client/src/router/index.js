import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductList from '../views/ProductList'
import Register from '../views/Register'
import AddProduct from '../views/AddProduct'
import CategoryList from '../views/CategoryList'
import AddCategory from '../views/AddCategory'
import UserInfo from '../views/UserInfo'
import CartList from '../views/CartList'
import AddCart from '../views/AddCart'
import BannerList from '../views/BannerList'
import AddBanner from '../views/AddBanner'

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
    path: '/menu',
    name: 'Menu',
    component: ProductList
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/addproduct',
    component: AddProduct
  },
  {
    path: '/category',
    component: CategoryList
  },
  {
    path: '/addcategory',
    component: AddCategory
  },
  {
    path: '/info',
    component: UserInfo
  },
  {
    path: '/cartlist',
    component: CartList
  },
  {
    path: '/addcart',
    component: AddCart
  },
  {
    path: '/bannerlist',
    component: BannerList
  },
  {
    path: '/addbanner',
    component: AddBanner

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
