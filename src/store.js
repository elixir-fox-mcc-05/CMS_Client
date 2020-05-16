import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginEmail : '',
    isLoggedIn : false,
    loginModal : false,
    loginHasInfo : false,
    loginInfo : ``,
    userInfo : {},
    merchantProducts : [],
    categories : [],
    pictures : []
  },
  mutations: {
    SetIsLogin(state, data){
      state.isLoggedIn = data
    },
    setLoginEmail(state, data){
      state.loginEmail = data
    },
    showLoginModal(state){
      state.loginModal = true
    },
    hideLoginModal(state){
      state.loginModal = false
    },
    showInfoLogin(state){
      state.loginHasInfo = true;
    },
    hideInfoLogin(state){
      state.loginHasInfo = false;
    },
    setLoginInfo(state, data) {
      state.loginInfo = data
    },
    setInfo(state, data) {
      state.userInfo = data
    },
    storeMerchantProducts(state, data) {
      state.merchantProducts = data
    },
    storeCategories(state, data) {
      state.categories = data
    },
    storeProductPictures(state, data) {
      state.pictures = data
    }
  },
  actions: {
    clearUserInfo({ commit }) {
      return new Promise ((resolve) => {
        resolve(commit('SetIsLogin',false))
      })  .then (() => {
        return commit('setInfo', {})
      })
    },
    loadMerchantProduct({commit}) {
      axios.get('http://localhost:3000/products/owned', {
        headers : {
            cmsaccesstoken : localStorage.cmsaccesstoken
        }
      }).then ( ({data}) => {
        console.log(data.result)
        commit('storeMerchantProducts', data.result)
      })
    },
    loadCategories({commit}) {
      axios.get('http://localhost:3000/categories')
      .then ( ({data}) => {
        commit('storeCategories', data.Category)
      })
    },
    loadProductPictures({commit}) {
      axios.get('http://localhost:3000/pictures/merchant', {
        headers : {
            cmsaccesstoken : localStorage.cmsaccesstoken
        }
      })
      .then ( ({data}) => {
        commit('storeProductPictures', data)
      }).catch( err => {
        console.log(err.response)
      })
    }
  }
})
