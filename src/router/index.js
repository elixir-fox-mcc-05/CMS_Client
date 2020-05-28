import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import DashboardIndex from '../views/DashboardIndex.vue'
import DashboardHome from '../views/Dashboard/DashboardHome.vue'
import DashboardProducts from '../views/Dashboard/DashboardProducts.vue'
import DashboardUsers from '../views/Dashboard/DashboardUsers.vue'
import DashboardHelp from '../views/Dashboard/DashboardHelp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/dashboard',
    name: 'DashboardIndex',
    component: DashboardIndex,
    children: [
      {
        path: '',
        component: DashboardHome
      },
      {
        path: 'products',
        component: DashboardProducts
      },
      {
        path: 'users',
        component: DashboardUsers
      },
      {
        path: 'help',
        component: DashboardHelp
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
