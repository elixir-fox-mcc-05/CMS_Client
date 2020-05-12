import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hideLogin: true,
    products: [],
    item: {},
    showRegister: false,
    carts: [],
    itemcart: {}
  },
  mutations: {
    SET_LOGGED (state, payload) {
      state.logged = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_ITEM (state, payload) {
      state.item = payload
    },
    SET_HIDELOGIN (state, payload) {
      state.hideLogin = payload
    },
    SET_SHOWREGISTER (state, payload) {
      state.showRegister = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_ITEMCART (state, payload) {
      state.itemcart = payload
    }
  },
  actions: {
    getProducts () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products'
      })
        .then((data) => {
          console.log(data.data)
          this.commit('SET_PRODUCTS', data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {}
})
