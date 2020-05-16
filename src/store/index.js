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
    },
    ADD_CATEGORIES (state, payload) {
      state.categories.push(payload)
    },
    ADD_PRODUCT (state, payload) {
      state.categories.push(payload)
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
        })
    },
    login (context, payload) {
      return axios({
        method: 'post',
        url: baseUrl + 'user/login',
        data: payload
      })
    },
    editCategories (context, payload) {
      return axios({
        method: 'put',
        url: baseUrl + `category/${payload.id}`,
        headers: {
          token: payload.token
        },
        data: payload.data
      })
    },
    deleteCategories (context, payload) {
      return axios({
        method: 'delete',
        url: baseUrl + `category/${payload.id}`,
        headers: {
          token: payload.token
        }
      })
    },
    editProduct (context, payload) {
      return axios({
        method: 'put',
        url: baseUrl + `product/${payload.id}`,
        headers: {
          token: payload.token
        },
        data: payload.data
      })
    },
    deleteProduct (context, payload) {
      return axios({
        method: 'delete',
        url: baseUrl + `category/${payload.id}`,
        headers: {
          token: payload.token
        }
      })
    },
    addCategories (context, payload) {
      return axios({
        method: 'POST',
        url: baseUrl + 'category',
        headers: {
          token: payload.token
        },
        data: payload.data
      })
    },
    addProduct (context, payload) {
      return axios({
        method: 'POST',
        url: baseUrl + 'category',
        headers: {
          token: payload.token
        },
        data: payload.data
      })
    }
  },
  modules: {
  }
})
