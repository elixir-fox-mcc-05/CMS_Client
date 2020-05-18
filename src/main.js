import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VModal from 'vue-js-modal'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify'
Vue.use(Vuetify, {
  iconfont: 'mdi'
})
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VModal)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Vuetify,
  vuetify,
  render: h => h(App)
}).$mount('#app')
