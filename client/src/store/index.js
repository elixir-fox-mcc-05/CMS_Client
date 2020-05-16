import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    product: [],
    category: [],
  },
  mutations: {
    GET_PRODUCT() {
        Axios({
            method: 'get',
            url: this.state.baseUrl+'/product'
        })
        .then(result=>{
          this.state.product = result.data
        })
        .catch(err=>{
        })
    },
    GET_CATEGORY() {
      Axios({
          method: 'get',
          url: this.state.baseUrl+'/category'
      })
      .then(result=>{
        this.state.category = result.data
        console.log(result)
      })
      .catch(err=>{
        console.log(err)
      })
  }
  },
  actions: {
  },
  modules: {
  }
})
