import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'
// import server from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    products: []
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      return server.post('/users/login', {
        email: payload.email,
        password: payload.password
      })
    },
    readAllProduct ({ commit }, token) {
      return server.get('/products', {
        headers: {
          token
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

export default store
