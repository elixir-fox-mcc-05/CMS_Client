import Vue from 'vue'
import VueRouter from 'vue-router'
import front from '../views/front.vue'
import home from '../views/home.vue'
// import Login from '../views/login.vue'
import stock from '../components/stock_item.vue'
import tabelStock from '@/components/stock_table.vue'
import addForm from '@/components/add_form.vue'
import category from '@/components/category.vue'
import addFormCategory from '@/components/add_form_category.vue'
import categoryTable from '@/components/category_table.vue'
import editForm from '@/components/editProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Front',
    component: front
  },
  {
    path: '/home',
    name: 'Home',
    component: home,
    children: [{
      path: 'stock',
      component: stock,
      children: [{
        path: 'tabelstock',
        component: tabelStock
      },
      {
        path: 'addform',
        component: addForm
      },
      {
        path: 'editform/:id',
        component: editForm
      }]
    },
    {
      path: 'category',
      component: category,
      children: [{
        path: 'addcategory',
        component: addFormCategory
      },
      {
        path: 'tablecategory',
        component: categoryTable
      }]
    }]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
