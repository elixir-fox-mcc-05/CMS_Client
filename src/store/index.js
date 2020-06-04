import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    currentUser: ''
  },
  mutations: {
    set_login (state, payload) {
      state.isLogin = payload
    },
    set_currentUser (state, payload) {
      state.currentUser = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
