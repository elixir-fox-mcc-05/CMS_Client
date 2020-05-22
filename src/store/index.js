import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    currentUsername: ''
  },
  mutations: {
    set_login (state, payload) {
      state.isLogin = payload
    },
    set_currentUserName (state, payload) {
      state.currentUserName = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
