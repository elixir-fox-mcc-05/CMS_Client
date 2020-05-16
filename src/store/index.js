import Vue from 'vue'
import Vuex from 'vuex'
import axiosShot from '../axios/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: '0.1',
    isSignedIn: false,
    items: []
  },
  mutations: {
    SET_SIGNED_IN (state, payload) {
      state.isSignedIn = payload
    },
    SET_ITEMS (state, payload) {
      state.items = payload
    }
  },
  actions: {
    signIn (context, payload) {
      return axiosShot({
        method: 'POST',
        url: '/signin',
        data: payload
      })
    },
    fetchProducts (context, payload) {
      return axiosShot({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {}
})
