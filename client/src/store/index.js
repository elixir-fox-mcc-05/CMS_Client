import Vue from 'vue'
import Vuex from 'vuex'
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
  }
})

export default store
