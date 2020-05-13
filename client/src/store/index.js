import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  // plugins: [createPersistedState()],
  mutations: {
    SET_PRODUCT (state, dataBaru) {
      state.products = dataBaru
    }
  },
  actions: {
    fetchProduct (context, payload) {
      axios({
        method: 'GET',
        url: '/product',
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          console.log('actions fetch >>')
          const newproducts = result.data.data
          console.log('fetsch run', newproducts)
          context.commit('SET_PRODUCT', newproducts)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
