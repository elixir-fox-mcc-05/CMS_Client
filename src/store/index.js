import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    hideLogin: true,
    products: [],
    item: {},
    showRegister: false,
    carts: [],
    itemcart: {},
    productCards: []
  },
  mutations: {
    SET_PRODUCTCARDS (state, payload) {
      state.productCards = payload
    },
    SET_LOGGED (state, payload) {
      state.logged = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_ITEM (state, payload) {
      state.item = payload
    },
    SET_HIDELOGIN (state, payload) {
      state.hideLogin = payload
    },
    SET_SHOWREGISTER (state, payload) {
      state.showRegister = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_ITEMCART (state, payload) {
      state.itemcart = payload
    }
  },
  actions: {
    loggedIn (context) {
      context.commit('SET_LOGGED', true)
      context.commit('SET_HIDELOGIN', true)
      context.commit('SET_SHOWREGISTER', false)
    },
    openRegister (context) {
      context.commit('SET_HIDELOGIN', true)
      context.commit('SET_SHOWREGISTER', true)
    },
    openLogin (context) {
      context.commit('SET_HIDELOGIN', false)
      context.commit('SET_SHOWREGISTER', false)
    },
    cancelLogin (context) {
      context.commit('SET_HIDELOGIN', true)
      context.commit('SET_SHOWREGISTER', false)
    },
    addToCart (context, payload) {
      return new Promise((resolve, reject) => {  
        console.log(payload)
        axios({
          method: 'POST',
          url: 'http://localhost:3000/cart',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            productId: payload.productId,
            quantity: payload.quantity
          }
        })
          .then((data) => {
            console.log(data.data)
            resolve(data)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
        })
    },
    addMore (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'PUT',
          url: 'http://localhost:3000/cart/edit/' + payload.id,
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            quantity: payload.quantity
          }
        })
          .then((data) => {
            console.log('sukses')
            resolve(data.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getProducts () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products'
      })
        .then((data) => {
          this.commit('SET_PRODUCTS', data.data)
          this.commit('SET_PRODUCTCARDS', data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    findByGenre (context, genre) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products/genre/' + genre
      })
        .then((data) => {
          console.log(data)
          this.commit('SET_PRODUCTCARDS', data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/login',
          data: payload
        })
          .then((data) => {
            context.commit('SET_LOGGED', true)
            this.state.logged = true
            resolve(data.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/register',
          data: payload
        })
          .then((data) => {
            context.commit('SET_LOGGED', true)
            this.state.logged = true
            resolve(data.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getCarts () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/cart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((data) => {
          this.commit('SET_CARTS', data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteCart (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: 'http://localhost:3000/cart/delete/' + payload,
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
  modules: {}
})
