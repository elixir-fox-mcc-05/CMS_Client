import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    toggleLogin: true,
    errMessage: '',
    successMessage: '',
    categories: [],
    userRole: ''
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    TOGGLE_LOGIN (state, payload) {
      state.toggleLogin = payload
    },
    SET_ERROR (state, payload) {
      state.errMessage = payload
    },
    SET_SUCCESS (state, payload) {
      state.successMessage = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_ROLE (state, role) {
      state.userRole = role
    }
  },
  actions: {
    getAllProducts ({ commit }) {
      return server.get('/products', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_PRODUCTS', data.Products)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCategories ({ commit }) {
      return server.get('/categories', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_CATEGORIES', data.Categories)
        })
    }
  }
})

export default store
