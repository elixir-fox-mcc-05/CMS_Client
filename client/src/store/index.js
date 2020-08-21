import Vue from 'vue'
import Vuex from 'vuex'
import Server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    product: [],
    category: []
  },
  mutations: {
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_CATEGORY (state, payload) {
      state.category = payload
    }
  },
  actions: {
    getProduct (context) {
        Server({
            method: 'get',
            url: '/product'
        })
        .then(result=>{
          context.commit('SET_PRODUCT', result.data)
        })
        .catch(err=>{
        })
    },
    getCategory (context) {
      Server({
          method: 'get',
          url: '/category'
      })
      .then(result=>{
        context.commit('SET_CATEGORY', result.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    deleteProduct (context,id) {
      Server ({
        method: 'delete',
        url: '/product/'+id
      })
      .then (result =>{
        context.dispatch('getProduct')
      })
      .catch (err =>{
        console.log(err)
      })
    }
  },
  modules: {
  }
})
