import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    count: 0,
    products: [],
    cartItems: [],
    total: 0
  },
  mutations: {
    SET_LOGIN (state, status) {
      state.isLogin = status
    },
    SET_ADMIN (state, status) {
      state.isAdmin = status
    },
    COBA_INCREMENT (state, num) {
      state.count += num
    },
    GET_PRODUCT (state, param) {
      state.products = param
    },
    MY_CART (state, param) {
      state.cartItems = param
    },
    TOTAL (state, param) {
      state.total += param
    }
  },
  actions: {
    fect: function (context) {
      return axios({
        method: 'GET',
        url: 'https://hidden-beyond-51968.herokuapp.com/product'
      })
        .then((result) => {
          context.commit('GET_PRODUCT', result.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    cartItems: function (context) {
      return axios({
        method: 'GET',
        url: 'https://hidden-beyond-51968.herokuapp.com/product/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((result) => {
          var arr = []
          for (const i in result.data) {
            context.commit('TOTAL', result.data[i].subTotal)
            arr.push(result.data[i])
          }
          context.commit('MY_CART', arr)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})

export default store
