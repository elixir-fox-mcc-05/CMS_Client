<template>
  <div class="form-container">
    <div class="form-box">
      <form @submit.prevent="processEditProduct">
        <h1>Edit Product</h1>
        <div class="form-group">
            <label for="product-name">Product Name</label>
            <input type="text" class="form-control" id="product-name" v-model="productName" placeholder="Product Name">
        </div>
        <label for="product-image">Product Image Url</label>
        <div class="custom-file">
          <input type="file" @change="setUploadImage" class="custom-file-input" id="imageUpload">
          <label class="custom-file-label" for="customFile">Choose Product Image</label>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="product-price">Price</label>
            <input type="text" class="form-control" id="product-price" v-model="productPrice" placeholder="Product Price">
          </div>
          <div class="form-group col-md-6">
            <label for="product-category">Category</label>
            <select id="product-category" class="form-control" v-model="productCategory">
              <option selected value="">Choose Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="form-group col-md-3">
            <label for="product-stock">Stock</label>
            <input type="number" class="form-control" id="product-stock" v-model="productStock" placeholder="Stock">
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block" v-if="!isLoading"><span class="fas fa-pen-square"></span> Edit Product</button>
        <div class="progress" style="height: 20px;" v-if="isLoading">
          <div
            class="progress-bar"
            role="progressbar"
            :style="`width: ${uploadProgress}%;`"
            :aria-valuenow="uploadProgress"
            aria-valuemin="0"
            aria-valuemax="100"
          >Progress: {{ uploadProgress.toFixed() }}%</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import firebase from 'firebase'

export default {
  name: 'EditForm',
  data () {
    return {
      productId: '',
      productName: '',
      productUrl: '',
      productPrice: '',
      productStock: '',
      productCategory: '',
      uploadedImage: '',
      uploadProgress: 0
    }
  },
  methods: {
    setDefaultValue () {
      const product = this.$store.state.product
      this.productId = product.id
      this.productName = product.name
      this.productUrl = product.image_url
      this.productPrice = product.price
      this.productStock = product.stock
      this.productCategory = product.categoryId
    },
    setUploadImage (event) {
      this.uploadedImage = event.target.files[0]
    },
    processEditProduct () {
      if (this.uploadedImage) {
        this.firebaseUpload()
      } else {
        this.editProduct()
      }
    },
    editProduct () {
      const product = {
        id: this.productId,
        name: this.productName,
        imageUrl: this.productUrl,
        price: this.productPrice,
        stock: this.productStock,
        categoryId: this.productCategory
      }
      this.$store.dispatch('editProduct', product)
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Success Update Product Data',
            text: `${product.name} data is updated`
          })
          this.productId = ''
          this.productName = ''
          this.productUrl = ''
          this.productPrice = ''
          this.productStock = ''
          this.productCategory = ''
          this.$router.push({ name: 'product' })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text: `${err.response.data.error}`
          })
        })
        .finally(() => {
          this.$store.commit('set_loading_status', false)
        })
    },
    firebaseUpload () {
      this.$store.commit('set_loading_status', true)
      const storageRef = firebase.storage().ref(`${this.uploadedImage.name}`).put(this.uploadedImage)
      storageRef.on('state_changed', snapshot => {
        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, error => { console.log(error.message) },
      () => {
        this.uploadProgress = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.productUrl = url
          this.editProduct()
        })
      }
      )
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    categories () {
      return this.$store.state.categories
    }
  },
  created () {
    this.setDefaultValue()
  }

}
</script>

<style scoped>
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.form-box {
    padding: 10px;
    width: 65%;
    background-color: rgb(233, 230, 230);
    border-radius: 10px;
    -webkit-box-shadow: -1px 10px 13px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px 10px 13px -1px rgba(0,0,0,0.75);
    box-shadow: -1px 10px 13px -1px rgba(0,0,0,0.75);
    font-family: 'Bree Serif', serif;
    font-size: larger;
    margin: 10px;
}
</style>
