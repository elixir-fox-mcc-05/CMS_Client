import Vue from 'vue'
import Vuex from 'vuex'
import axiosShot from '../axios/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignedIn: false
  },
  mutations: {
    SET_SIGNED_IN (state, payload) {
      state.isSignedIn = payload
    }
  },
  actions: {
    signIn (context, payload) {
      return axiosShot({
        method: 'POST',
        url: '/signin',
        data: payload
      })
    }
  },
  modules: {}
})
