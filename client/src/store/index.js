import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    select: 'login',
    products: [],
    categories: [],
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
          console.log('buset', data.data)
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
        password: payload.password
      })
    },
    fetchCategory ({ commit, state }) {
      return server.get('/category', {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('category',data)
          commit('SET_CATEGORIES', data.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  getters: {
    loggedIn: state => state.loggedIn
  },
  modules: {
  }
})

export default store
