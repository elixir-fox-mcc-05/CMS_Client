import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    select: 'login',
    products: [],
    loggedIn: false,
    updateData: {},
    deletedData: {}
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.loggedIn = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_UPDATE (state, payload) {
      state.updateData = payload
    },
    SET_DELETE (state, payload) {
      state.deletedData = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      return server.get('/products')
        .then(({ data }) => {
          commit(this.SET_PRODUCTS, data)
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
    }
  },
  getters: {

  },
  modules: {
  }
})

export default store
