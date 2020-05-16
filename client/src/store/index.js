import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'
// import server from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      return server.post('/users/login', {
        email: payload.email,
        password: payload.password
      })
    }
  }
})

export default store
