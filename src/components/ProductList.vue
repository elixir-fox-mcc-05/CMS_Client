<template>
  <div class="container">
    <div class="add-btn bg-primary text-white" @click.prevent="showAddForm">
      <i class="fas fa-plus"></i>
    </div>
    <table class="table table-sm table-hover table-striped mt-4">
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
          <td>
            <a @click.prevent="$store.commit('changeIndexProduct', i)" class="btn btn-warning text-white" type="button">
              <i class="fas fa-edit"></i>
            </a>
            <a @click.prevent="$store.commit('changeIndexProduct2', i)" class="btn btn-danger text-white ml-4" type="button">
              <i class="fas fa-trash-alt"></i>
            </a>
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
  @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@700&display=swap');
  img {
      width: 100px;
      height: 100px;
  }
  .table {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  }
  thead tr th {
    font-family: 'Balsamiq Sans';
    font-size: 20px;
  }
  .add-btn {
    position: fixed;
    bottom: 80px;
    right: 15px;
    background-color: #05d595;
    width: 50px;
    height: 50px;
    display: flex;
    border-radius: 20%;
    justify-content: center;
    align-items: center;
    transition: .5s;
    cursor: pointer;
  }
  .add-btn i {
    font-size: 30px;
    color: white;
  }
  .add-btn:hover {
    transform: scale(1.2);
    font-weight: bold;
  }
</style>
