import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'
import Vuesax from 'vuesax'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Vuetable, VuetablePagination, VuetablePaginationInfo } from 'vuetable-2'
import Datatable from 'vue2-datatable-component'
import * as firebase from 'firebase'
var firebaseConfig = {
  apiKey: 'AIzaSyDr-YMLJpW779p8L1s9sgJQsEbSCxVCkp8',
  authDomain: 'g-ecommers.firebaseapp.com',
  databaseURL: 'https://g-ecommers.firebaseio.com',
  projectId: 'g-ecommers',
  storageBucket: 'g-ecommers.appspot.com',
  messagingSenderId: '720573661600',
  appId: '1:720573661600:web:6937b0c620bc4102b364c5'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

Vue.use(Datatable)
// Install BootstrapVue
Vue.use(Vuetable)
Vue.use(VuetablePagination)
Vue.use(VuetablePaginationInfo)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Vuesax)
Vue.config.productionTip = false
Vue.use(Toasted)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
