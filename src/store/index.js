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
    processedId: '',
    newProduct: {},
    product: {},
    categories: [],
    category: ''
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
    },
    set_category (state, payload) {
      state.category = payload
    },
    set_category_list (state, payload) {
      state.categories = payload
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
      const { name, imageUrl, price, stock, categoryId } = this.state.newProduct
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
    editProduct ({ commit }) {
      const token = localStorage.access_token
      const { id, name, imageUrl, price, stock, categoryId } = this.state.product
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
    addCategory ({ commit }) {
      const token = localStorage.access_token
      const name = this.state.category
      return server.post('/categories', {
        name
      }, {
        headers: {
          access_token: token
        }
      })
    },
    editCategory ({ commit }) {
      const token = localStorage.access_token
      const name = this.state.category
      return server.put(`categories/${this.state.processedId}`, {
        name
      }, {
        headers: {
          access_token: token
        }
      })
    },
    deleteCategory ({ commit }) {
      const token = localStorage.access_token
      return server.delete(`/categories/${this.state.processedId}`, {
        headers: {
          access_token: token
        }
      })
    }
  }
})
