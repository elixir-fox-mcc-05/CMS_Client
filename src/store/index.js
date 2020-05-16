import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentlyLoggedIn: false,
    allProducts: [],
    allCategory: [
      {
        id: 1,
        name: 'Rabbit Food'
      },
      {
        id: 2,
        name: 'Vitamins and Supplements'
      },
      {
        id: 3,
        name: 'Grooming'
      },
      {
        id: 4,
        name: 'Toys and Cages'
      }
    ]
  },
  mutations: {
    set_currentlyLoggedIn (state, payload) {
      state.currentlyLoggedIn = payload
    },
    set_allProducts (state, payload) {
      state.allProducts = payload
    }
  },
  actions: {
    // Ingat: Dalam mutations, method-nya harus memiliki parameter state
    // Ingat: kalau actions, method-nya harus memiliki parameter context. Contoh context.commit('nama mutation', payloadForMutation)
    // Ingat: Dalam component, action dipanggil menggunakan dispatch. e.g: this.$store.dispatch('fetchAllProducts')
    // Ingat: Dalam component, mutation dipanggil menggunakan commit. e.g: this.$store.commit('set_currentlyLoggedIn', true)
    fetchAllProducts (context) {
      axios({
        method: 'GET',
        url: 'https://peaceful-peak-29407.herokuapp.com/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          const allProducts = result.data.allProducts
          context.commit('set_allProducts', allProducts)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
