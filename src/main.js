import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import Toasted from 'vue-toasted'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

var firebaseConfig = {
  apiKey: 'AIzaSyAphAEuZav7Sqs-tLOVttjRuHV1PNg0Luo',
  authDomain: 'gober-sporting-goods.firebaseapp.com',
  databaseURL: 'https://gober-sporting-goods.firebaseio.com',
  projectId: 'gober-sporting-goods',
  storageBucket: 'gober-sporting-goods.appspot.com',
  messagingSenderId: '604715662770',
  appId: '1:604715662770:web:81214de4655c7ead2278ab'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

Vue.use(Toasted, {
  theme: 'outline',
  position: 'top-right',
  duration: 5000,
  type: 'error',
  action: {
    text: 'Close',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
})

Vue.use(VueSidebarMenu)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
