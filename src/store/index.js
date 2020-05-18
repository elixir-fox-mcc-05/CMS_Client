import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const baseUrl = 'http://localhost:3000/'

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: '',
    message: ''
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_TOKEN (state, payload) {
      state.token = payload
    },
    ADD_CATEGORIES (state, payload) {
      state.categories.push(payload)
    },
    ADD_PRODUCT (state, payload) {
      state.categories.push(payload)
    },
    SET_MESSAGE (state, payload) {
      state.message = payload
    }
  },
  actions: {
    fetchProducts (context, payload) {
      return axios({
        method: 'get',
        url: baseUrl + 'product',
        headers: {
          token: payload
        }
      })
    },
    fetchCategories (context, payload) {
      return axios({
        method: 'get',
        url: baseUrl + 'category',
        headers: {
          token: payload
        }
      })
    },
    login (context, payload) {
      return axios({
        method: 'post',
        url: baseUrl + 'user/login',
        data: payload
      })
    },
    editCategory (context, payload) {
      return axios({
        method: 'PUT',
        url: baseUrl + `category/${payload.id}`,
        headers: {
          token: payload.token
        },
        data: {
          name: payload.name
        }
      })
    },
    deleteCategory (context, payload) {
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
    addCategory (context, payload) {
      return axios({
        method: 'POST',
        url: baseUrl + 'category',
        headers: {
          token: payload.token
        },
        data: { name: payload.name }
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
