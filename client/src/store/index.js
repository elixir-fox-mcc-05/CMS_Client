import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    fetchProduct (context, payload) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/product',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          const products = data.data.products
          context.commit('SET_PRODUCTS', products)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
