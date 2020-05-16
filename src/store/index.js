import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: '',
    products: '',
    currentPage: 'productList',
    indexProduct: '',
    indexProduct2: '',
    loginForm: false
  },
  mutations: {
    changeLoginStatus (state, payload) {
      this.state.isLogin = payload
    },
    getProductsData (state, payload) {
      this.state.products = ''
      this.state.products = payload
    },
    changeCurrentPage (state, payload) {
      this.state.currentPage = payload
    },
    changeIndexProduct (state, payload) {
      this.state.indexProduct = payload
    },
    changeIndexProduct2 (state, payload) {
      this.state.indexProduct2 = payload
    },
    showLoginForm (state, payload) {
      this.state.loginForm = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios.get('http://localhost:3000/products', {
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          let { data } = response
          data = data.Products
          commit('getProductsData', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
