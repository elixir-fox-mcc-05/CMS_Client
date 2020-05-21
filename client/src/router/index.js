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
    component: ProductList,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      }else {
        next({ path: '/' })
      }
    }
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/addproduct',
    component: AddProduct,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      }else {
        next({ path: '/' })
      }
    }
  },
  {
    path: '/category',
    component: CategoryList,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      }else {
        next({ path: '/' })
      }
    }
  },
  {
    path: '/addcategory',
    component: AddCategory,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      }else {
        next({ path: '/' })
      }
    }
  },
  {
    path: '/info',
    component: UserInfo,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      }else {
        next({ path: '/' })
      }
    }
  },
  {
    path: '/cartlist',
    component: CartList,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      }else {
        next({ path: '/' })
      }
    }
  },
  {
    path: '/addcart',
    component: AddCart,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      }else {
        next({ path: '/' })
      }
    }
  },
  {
    path: '/bannerlist',
    component: BannerList,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      }else {
        next({ path: '/' })
      }
    }
  },
  {
    path: '/addbanner',
    component: AddBanner,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next()
      }else {
        next({ path: '/' })
      }
    }

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
