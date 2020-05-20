import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    select: 'login',
    products: [],
    carts: [],
    categories: [],
    banners: [],
    loggedIn: false,
    updateData: {},
    deletedData: {},
    addData: {}
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.loggedIn = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_UPDATEPRODUCT (state, payload) {
      state.updateData = payload
    },
    SET_DELETEPRODUCT (state, payload) {
      state.deletedData = payload
    },
    SET_ADDPRODUCT (state, payload) {
      state.addData = payload
    },
    SET_CATEGORIES (state, payload) {
      // console.log(payload)
      state.categories = payload
      // console.log('aso', state.categories)
    },
    SET_CARTS (state, payload) {
      state.carts = payload
      // console.log('zzz', state.carts)
    },
    SET_BANNERS (state, payload) {
      state.banners = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      return server.get('/products/list', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('products', data.data)
          commit('SET_PRODUCTS', data.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    login ({ commit, state }, payload) {
      console.log(payload)
      return server.post('/login', {
        email: payload.email,
        password: payload.password

      })
    },
    register ({ commit, state }, payload) {
      console.log(payload)
      return server.post('/register', {
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password,
        roles: payload.roles
      })
    },
    fetchCategory ({ commit, state }) {
      return server.get('/category', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('category', data)
          commit('SET_CATEGORIES', data.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchCart ({ commit, state }) {
      return server.get('/cart/list', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('cart', data.data)
          commit('SET_CARTS', data.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchBanners ({ commit, state }) {
      return server.get('/banner/list', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('banners', data.data)
          commit('SET_BANNERS', data.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  getters: {
    loggedIn: state => state.loggedIn,
    carts: state => state.carts,
    products: state => state.products,
    categories: state => state.categories,
    banners: state => state.banners
  },
  modules: {
  }
})

export default store
