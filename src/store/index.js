import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/server.js'
// import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    isAdmin: false,
    cart: [1, 3]
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_LOGIN (state, bool) {
      state.isLogin = bool
      console.log('isLogin', state.isLogin)
    },
    SET_ADMIN (state, bool) {
      state.isAdmin = bool
      console.log('isAdmin', state.isAdmin)
    },
    FILL_CART (state, payload) {
      state.cart.push(payload)
    },
    EMPTY_CART (state, payload) {
      state.cart = []
    }
  },
  actions: {
    getProducts ({ commit }) {
      return axios({
        url: '/products',
        method: 'GET'
      })
        .then(products => {
          commit('SET_PRODUCTS', products)
        })
        .catch(err => console.log(err))
    }
    // signIn ({ commit }) {
    //   return server.post('/users')
    //     .send({ email, password })
    //     .then(({ accessToken }) => {
    //       localStorage.setItem('SET_LOGIN', access_token)
    //       commit('setLogin', true)
    //     })
    //     .catch(err => console.log(err))
    // }
  },
  modules: {

  },
  getters: {
    cartItems(state) {
      return state.cart.length;
    }
  }
})
