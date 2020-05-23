<template>
     <div @submit.prevent="submitForm" class="form-container">
        <h2 class="text-center mt-4">Edit Product</h2>
        <form action="" class="mt-4">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" placeholder="Product Name" class="form-control" v-model="name">
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" name="price" placeholder="Product Price" class="form-control" v-model="price">
            </div>
            <div class="form-group">
                <label for="stock">Stock</label>
                <input type="number" name="stock" placeholder="Your stock" class="form-control" v-model="stock">
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select name="category" v-model="category" class="form-control">
                    <option disabled value="">Selected:</option>
                    <option>Electronics</option>
                    <option>Books</option>
                    <option>Utilities</option>
                    <option>Other Products</option>
                </select>
            </div>
            <!-- <div class="form-group">
                <label for="image_url">Image URL</label>
                <input type="text" image_url="image_url" placeholder="Product image_url" class="form-control" v-model="image_url">
                <div v-for="(feedback,i) in feedbacks" :key="i">
                  <div v-html="feedback"></div>
                </div>
            </div> -->
            <div class="form-group">
              <label for="upload">Upload Image:</label>
              <input type="file" @change="imageUpload">
              <button @click.prevent="uploadImage">Upload</button>
              <div v-for="(feedback,i) in feedbacks" :key="i">
                <div v-html="feedback"></div>
              </div>
            </div>
            <div class="btn-form">
              <button type="submit" class="btn btn-success">Submit</button>
              <button @click.prevent ="showProductList" class="btn btn-danger ml-2">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'UpdateForm',
  data () {
    return {
      index: this.indexProduct,
      name: '',
      stock: '',
      price: '',
      category: '',
      image_url: '',
      feedbacks: []
    }
  },
  computed: {
    indexProduct () {
      return this.$store.state.indexProduct
    }
  },
  methods: {
    showProductList () {
      this.$store.commit('changeIndexProduct', '')
      this.$store.commit('changeCurrentPage', 'productList')
    },
    imageUpload (event) {
      this.image = event.target.files[0]
    },
    uploadImage () {
      var formDataBody = new FormData()
      formDataBody.append('image', this.image, this.image.name)
      axios.post('http://localhost:3000/products/upload', formDataBody)
        .then(response => {
          const { data } = response
          this.image_url = data.Location
          Swal.fire(
            'Good job!',
            'Upload Success!',
            'success'
          )
        })
        .catch(err => {
          err = err.response
          console.log(err)
          const { data } = err
          console.log(data)
        })
    },
    submitForm () {
      const token = localStorage.token
      const id = this.$store.state.products[this.indexProduct].id
      axios.patch(`http://localhost:3000/products/${id}`, {
        name: this.name,
        price: this.price,
        stock: this.stock,
        category: this.category,
        image_url: this.image_url
      }, {
        headers: {
          token
        }
      })
        .then(response => {
          this.$store.dispatch('fetchProducts')
          this.showProductList()
          this.name = ''
          this.price = ''
          this.category = ''
          this.stock = ''
          this.image_url = ''
          this.feedbacks = ''
          Swal.fire(
            'Good job!',
            'Succsessfully Edit Item!',
            'success'
          )
        })
        .catch(err => {
          err = err.response
          const { data } = err
          const error = data.message
          if (error.length > 0) {
            this.feedbacks = []
            for (let i = 0; i < error.length; i++) {
              const temp = `<p>${error[i].message}</p>`
              this.feedbacks.push(temp)
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message
            })
          }
        })
    }
  },
  created () {
    this.name = this.$store.state.products[this.indexProduct].name
    this.price = this.$store.state.products[this.indexProduct].price
    this.stock = this.$store.state.products[this.indexProduct].stock
    this.category = this.$store.state.products[this.indexProduct].category
    this.image_url = this.$store.state.products[this.indexProduct].image_url
  }
}
</script>

<style>
  .btn-form {
    display: flex;
    justify-content: center;
  }
</style>
