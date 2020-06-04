import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const baseUrl = 'https://lit-badlands-37387.herokuapp.com/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    currentUsername: '',
    products: [],
    categories: [],
    CategoryId: null,
    price: null,
    stock: null,
    errmessage: ''
  },
  mutations: {
    set_login (state, payload) {
      state.isLogin = payload
    },
    set_currentUserName (state, payload) {
      state.currentUserName = payload
    },
    set_products (state, payload) {
      state.products = payload
    },
    set_category (state, payload) {
      state.categories = payload
    },
    set_errmessage (state, payload) {
      state.errmessage = payload
    }
  },
  actions: {
    fetchProducts (context, payload) {
      axios({
        method: 'get',
        url: baseUrl + 'products'
      })
        .then(({ data }) => {
          context.commit('set_products', data.products)
        })
        .catch(err => {
          context.commit('set_errmessage', err.response.data.message)
        })
    },
    fetchCategory (context, payload) {
      axios({
        method: 'get',
        url: baseUrl + 'categories'
      }).then(({ data }) => {
        context.commit('set_category', data.Categories)
      }).catch(err => {
        context.commit('set_errmessage', err.response.data.message)
      })
    }
  },
  modules: {
  }
})
