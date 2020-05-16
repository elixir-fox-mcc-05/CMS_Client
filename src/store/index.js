import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const baseUrl = 'http://localhost:3000/'

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    categories: [],
    token: ''
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCT (state, payload) {
      state.products = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_TOKEN (state, payload) {
      state.token = payload
    }
  },
  actions: {
    fetchProducts (context, payload) {
      axios({
        method: 'get',
        url: baseUrl + 'product',
        headers: {
          token: payload
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCT', data.Product)
        })
    },
    fetchCategories (context, payload) {
      axios({
        method: 'get',
        url: baseUrl + 'category',
        headers: {
          token: payload
        }
      })
        .then(({ data }) => {
          context.commit('SET_CATEGORIES', data.Category)
          console.log(data.Category)
        })
    },
    login (context, payload) {
      return axios({
        method: 'post',
        url: baseUrl + 'user/login',
        data: payload
      })
    }
  },
  modules: {
  }
})
