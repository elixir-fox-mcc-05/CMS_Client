import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Register from './views/register.vue'
import Logout from './components/logout'
import Admin from './views/admin.vue'
import Merchant from './views/merchant.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: Merchant
    },
    { path : `/logout`, name : `Logout`, component : Logout}
    // { path : ``, name : ``, component : ``}
  ]
})
