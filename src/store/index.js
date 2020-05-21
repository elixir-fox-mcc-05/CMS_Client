import Vue from 'vue'
import Vuex from 'vuex'
import axiosShot from '../axios/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: '0.1',
    isSignedIn: false,
    products: [],
    totalProducts: 0
  },
  mutations: {
    SET_SIGNED_IN (state, payload) {
      state.isSignedIn = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_TOTAL_PRODUCTS (state, payload) {
      state.totalProducts = payload
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
    },
    createProduct (context, payload) {
      return axiosShot({
        method: 'POST',
        url: '/products',
        data: payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    getProductById (context, payload) {
      return axiosShot({
        method: 'GET',
        url: '/products/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    updateProduct (context, payload) {
      return axiosShot({
        method: 'PUT',
        url: '/products/' + payload.id,
        data: payload.data,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    deleteProduct (context, payload) {
      return axiosShot({
        method: 'DELETE',
        url: '/products/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {}
})
