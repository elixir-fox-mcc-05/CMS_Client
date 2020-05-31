import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    email: '',
    password: '',
    collapsed: false,
    product: {},
    categories: [],
    category: '',
    isLoading: false,
    loaderSize: '150px'
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
    set_product (state, payload) {
      state.product = payload
    },
    set_category (state, payload) {
      state.category = payload
    },
    set_category_list (state, payload) {
      state.categories = payload
    },
    set_loading_status (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      const { email, password } = payload
      return server.post('/users/login', {
        email,
        password
      })
    },
    delete ({ commit }, payload) {
      const token = localStorage.access_token
      return server.delete(`/products/${payload}`, {
        headers: {
          access_token: token
        }
      })
    },
    addNewProduct ({ commit }, payload) {
      const token = localStorage.access_token
      const { name, imageUrl, price, stock, categoryId } = payload
      console.log('this from store', imageUrl)
      return server.post('/products', {
        name,
        image_url: imageUrl,
        price,
        stock,
        categoryId
      }, {
        headers: {
          access_token: token
        }
      })
    },
    editProduct ({ commit }, payload) {
      const token = localStorage.access_token
      const { id, name, imageUrl, price, stock, categoryId } = payload
      return server.put(`/products/${id}`, {
        name,
        image_url: imageUrl,
        price,
        stock,
        categoryId
      }, {
        headers: {
          access_token: token
        }
      })
    },
    getAllCategory ({ commit }) {
      const token = localStorage.access_token
      return server.get('/categories?sort=name|asc', {
        headers: {
          access_token: token
        }
      })
        .then(({ data }) => {
          this.commit('set_category_list', [])
          const categories = []
          data.categories.forEach(category => {
            categories.push(category)
          })
          this.commit('set_category_list', categories)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text: `${err.response.data.error}`
          })
        })
    },
    addCategory ({ commit }, payload) {
      const token = localStorage.access_token
      const name = payload
      return server.post('/categories', {
        name
      }, {
        headers: {
          access_token: token
        }
      })
    },
    editCategory ({ commit }, payload) {
      const token = localStorage.access_token
      const { name, id } = payload
      return server.put(`categories/${id}`, {
        name
      }, {
        headers: {
          access_token: token
        }
      })
    },
    deleteCategory ({ commit }, payload) {
      const token = localStorage.access_token
      return server.delete(`/categories/${payload}`, {
        headers: {
          access_token: token
        }
      })
    }
  }
})
