import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    email: '',
    password: '',
    collapsed: false,
    processedId: '',
    newProduct: {},
    product: {}
  },
  mutations: {
    set_email (state, payload) {
      state.email = payload
    },
    set_password (state, payload) {
      state.password = payload
    },
    set_login_status (state, payload) {
      state.isLogin = payload
    },
    set_collapsed (state) {
      state.collapsed = !state.collapsed
    },
    set_id (state, payload) {
      state.processedId = payload
    },
    set_new_product (state, payload) {
      state.newProduct = payload
    },
    set_product (state, payload) {
      state.product = payload
    }
  },
  actions: {
    login ({ commit }) {
      return server.post('/users/login', {
        email: this.state.email,
        password: this.state.password
      })
    },
    delete ({ commit }) {
      const token = localStorage.access_token
      return server.delete(`/products/${this.state.processedId}`, {
        headers: {
          access_token: token
        }
      })
    },
    addNewProduct ({ commit }) {
      const token = localStorage.access_token
      const { name, imageUrl, price, stock } = this.state.newProduct
      return server.post('/products', {
        name,
        image_url: imageUrl,
        price,
        stock
      }, {
        headers: {
          access_token: token
        }
      })
    },
    editProduct ({ commit }) {
      const token = localStorage.access_token
      const { id, name, imageUrl, price, stock } = this.state.product
      return server.put(`/products/${id}`, {
        name,
        image_url: imageUrl,
        price,
        stock
      }, {
        headers: {
          access_token: token
        }
      })
    }
  }
})
