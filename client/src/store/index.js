import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    products: []
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      return server.post('/users/login', {
        email: payload.email,
        password: payload.password
      })
    },
    readAllProduct ({ commit }, token) {
      return server.get('/products', {
        headers: {
          token
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct ({ commit }, payload) {
      const token = payload.token
      return server.post('/products', {
        name: payload.name,
        description: payload.description,
        image_url: payload.image_url,
        price: payload.price,
        stock: payload.stock
      }, {
        headers: {
          token
        }
      })
    },
    updateProduct ({ commit }, payload) {
      const token = payload.token
      return server.put(`/products/${payload.productId}`, {
        name: payload.editName,
        description: payload.editDescription,
        image_url: payload.editImageUrl,
        price: payload.editPrice,
        stock: payload.editStock
      }, {
        headers: {
          token
        }
      })
    },
    searchProduct ({ commit }, payload) {
      const token = payload.token
      return server.get(`/products/${payload.productId}`, {
        headers: {
          token
        }
      })
    },
    deleteProduct ({ commit }, payload) {
      const token = payload.token
      return server.delete(`/products/${payload.productId}`, {
        headers: {
          token
        }
      })
    }
  }
})

export default store
