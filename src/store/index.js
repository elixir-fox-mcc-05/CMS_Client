import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    openAdd: false,
    openEdit: false,
    products: [],
    editProduct: {}
  },
  mutations: {
    SET_LOGGED (state, payload) {
      state.logged = payload
    },
    SET_OPENADD (state, payload) {
      state.openAdd = payload
    },
    SET_OPENEDIT (state, payload) {
      state.openEdit = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_EDITPRODUCT (state, payload) {
      state.editProduct = payload
    }
  },
  actions: {
    Logged (context, payload) {
      context.commit('SET_LOGGED', true)
    },
    LoggedOut (context, payload) {
      context.commit('SET_LOGGED', false)
    },
    openAddpage (context, payload) {
      context.commit('SET_OPENADD', true)
    },
    openEditpage (context, payload) {
      context.commit('SET_OPENEDIT', true)
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products/' + payload
      })
        .then(data => {
          context.commit('SET_EDITPRODUCT', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    closeEditpage (context, payload) {
      context.commit('SET_OPENEDIT', false)
    },
    closeAddpage (context, payload) {
      context.commit('SET_OPENADD', false)
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/admin/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(data => {
            resolve(data.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getProducts (context, payload) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products/all',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          console.log(data)
          context.commit('SET_PRODUCTS', data.data)
        })
    },
    addStock (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'PUT',
          url: 'http://localhost:3000/products/restock/' + payload.id,
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            stock: payload.stock
          }
        })
          .then(data => {
            resolve(data.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    edit (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'PUT',
          url: 'http://localhost:3000/products/edit/' + payload.id,
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            name: payload.name,
            image_url: payload.image_url,
            description: payload.description,
            stock: payload.stock,
            price: payload.price,
            genre: payload.genre
          }
        })
          .then(data => {
            resolve(data.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addProduct (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/products',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            name: payload.name,
            image_url: payload.image_url,
            description: payload.description,
            stock: payload.stock,
            price: payload.price,
            genre: payload.genre
          }
        })
          .then(data => {
            resolve(data.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    deleteProduct (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: 'http://localhost:3000/products/delete/' + payload,
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then((result) => {
            resolve(result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
