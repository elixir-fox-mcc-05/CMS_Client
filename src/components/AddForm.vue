<template>
    <div @submit.prevent="submitForm" class="form-container">
        <h2 class="text-center mt-4">Add New Product</h2>
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
  data () {
    return {
      name: '',
      stock: '',
      price: '',
      category: '',
      image_url: '',
      image: '',
      feedbacks: []
    }
  },
  methods: {
    showProductList () {
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
      axios.post('http://localhost:3000/products', {
        name: this.name,
        stock: this.stock,
        price: this.price,
        category: this.category,
        image_url: this.image_url
      }, {
        headers: {
          token: localStorage.token
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
          this.feedback = ''
          Swal.fire(
            'Good job!',
            'Succsessfully Add Item!',
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
  }
}
</script>
<style>

</style>
