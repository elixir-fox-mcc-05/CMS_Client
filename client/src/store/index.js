import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    product: []
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
    }
  },
  actions: {
  },
  modules: {
  }
})
