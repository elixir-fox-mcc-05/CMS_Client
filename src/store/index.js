import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    currentUsername: ''
  },
  mutations: {
    set_token (state, payload) {
      state.token = payload
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
