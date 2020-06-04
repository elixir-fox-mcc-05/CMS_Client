import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    productnames: [],
    productstock: []
  },
  // plugins: [createPersistedState()],
  mutations: {
    SET_PRODUCT (state, dataBaru) {
      state.products = dataBaru
    },
    SET_PRODUCT_NAMES (state, newdata) {
      state.productnames = newdata
    },
    SET_PRODUCT_STOCK (state, newdata) {
      state.productstock = newdata
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
          const newproducts = result.data.data
          const newproductnames = []
          const newproductstock = []
          console.log('fetch run', newproducts)
          for (const i in newproducts) {
            console.log(i, newproducts[i])
            newproductnames.push(newproducts[i].name)
            newproductstock.push([newproducts[i].stock])
          }
          console.log(newproductnames, newproductstock)
          context.commit('SET_PRODUCT_NAMES', newproductnames)
          context.commit('SET_PRODUCT_STOCK', newproductstock)
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
