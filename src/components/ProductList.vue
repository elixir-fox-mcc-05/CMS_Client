<template>
  <div class="container">
    <button @click.prevent="showAddForm" class="btn btn-primary mb-3" type="button">Add</button>
    <table class="table table-sm table-hover table-striped">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, i) in products" :key="i">
          <td><img :src="`${product.image_url}`" alt=""></td>
          <td>{{ product.name }}</td>
          <td>{{ priceInRupiah(product.price) }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td class="btn-action">
            <button @click.prevent="$store.commit('changeIndexProduct', i)" class="btn btn-primary" type="button">Edit</button>
            <button @click.prevent="$store.commit('changeIndexProduct2', i)" class="btn btn-primary" type="button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'ProductList',
  data () {
    return {
      showForm: false
    }
  },
  watch: {
    indexProduct (value) {
      if (value !== '') {
        this.$store.commit('changeCurrentPage', 'updateForm')
      }
    },
    indexProduct2 (value) {
      if (value !== '') {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
          .then(result => {
            if (result.value) {
              const id = this.$store.state.products[this.indexProduct2].id
              console.log(id)
              const token = localStorage.token
              axios.delete(`http://localhost:3000/products/${id}`, {
                headers: {
                  token
                }
              })
                .then(response => {
                  this.$store.dispatch('fetchProducts')
                  this.$store.commit('changeIndexProduct2', '')
                  this.$store.commit('changeCurrentPage', 'productList')
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                })
                .catch(err => {
                  err = err.response
                  const { data } = err
                  const error = data.message
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message
                  })
                })
            } else {
              this.$store.commit('changeIndexProduct2', '')
            }
          })
      }
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    indexProduct () {
      return this.$store.state.indexProduct
    },
    indexProduct2 () {
      return this.$store.state.indexProduct2
    }
  },
  methods: {
    showAddForm () {
      this.$store.commit('changeCurrentPage', 'addForm')
    },
    indexProductValue () {
      return this.$store.state.indexProduct
    },
    priceInRupiah (price) {
      const harga = price.toLocaleString()
      return `IDR ${harga}.00`
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
    img {
        width: 150px;
        height: 200px;
    }
    btn-action {
        display: flex;
        flex-direction: column !important;
    }
</style>
