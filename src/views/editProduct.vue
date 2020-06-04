<template>
  <div id="editProduct">
      <div class="container">
          <div class="row">
            <div class="col-10 mx-auto p-3 m-2" style="background-color:#2ecc71; display:flex; justify-content:center;border-radius:8px;">
             <form class="col-10">
                <label class="control-label" for="editProductName"><b>Product name:</b></label>
                <input class="form-control" id="editProductName" v-model="selectedProduct.name"><br>

                <label class="control-label" for="newProductName"><b>URL link to product image:</b></label>
                <input class="form-control" id="newProductImageUrl" v-model="selectedProduct.image_url"><br>

                <label class="control-label" for="newProductName"><b>Price:</b></label>
                <input class="form-control" id="newProductPrice" v-model="selectedProduct.price"><br>

                <label class="control-label" for="newProductName"><b>Stock:</b></label>
                <input class="form-control" id="newProductStock" v-model="selectedProduct.stock"><br>

                <label class="control-label" for="newProductName"><b>Category:</b></label>
                <input class="form-control" id="newProductCategory" v-model="selectedProduct.category"><br>
                <button type="button" @click="editProductData(selectedProduct.id)" class="btn btn-warning">Edit product data</button>
             </form>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'editProduct',
  data () {
    return {
      selectedProduct: ''
    }
  },
  methods: {
    editProductData (selectedId) {
      axios({
        method: 'PUT',
        url: `https://peaceful-peak-29407.herokuapp.com/products/${selectedId}`,
        // url: `http://localhost:3000/products/${selectedId}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: this.selectedProduct.name,
          image_url: this.selectedProduct.image_url,
          price: this.selectedProduct.price,
          stock: this.selectedProduct.stock,
          category: this.selectedProduct.category
        }
      })
        .then(result => {
          //   this.$store.dispatch('fetchAllProducts')
          this.$router.push('/dashboard')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    if (localStorage.access_token) {
      const selectedId = this.$route.params.id// Bisa kita dapatkan dengan this.$route.params.id
      axios({
        method: 'GET',
        url: `https://peaceful-peak-29407.herokuapp.com/products/${selectedId}`,
        // url: `http://localhost:3000/products/${selectedId}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          this.selectedProduct = result.data.selectedProduct
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style>

</style>
