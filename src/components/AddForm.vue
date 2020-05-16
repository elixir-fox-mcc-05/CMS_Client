<template>
  <div class="form-container">
    <div class="form-box">
      <form @submit.prevent="addProduct">
        <h1>Add New Product</h1>
        <div class="form-group">
            <label for="product-name">Product Name</label>
            <input type="text" class="form-control" id="product-name" v-model="productName" placeholder="Product Name">
        </div>
        <div class="form-group">
          <label for="product-image">Product Image Url</label>
          <input type="text" class="form-control" id="product-image" v-model="productUrl" placeholder="Product Image Url">
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
              <option v-for="category in $store.state.categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="form-group col-md-3">
            <label for="product-stock">Stock</label>
            <input type="number" class="form-control" id="product-stock" v-model="productStock" placeholder="Stock">
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block"><span class="fas fa-plus"></span> Add Product</button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'AddForm',
  data () {
    return {
      productName: '',
      productUrl: '',
      productPrice: '',
      productStock: '',
      productCategory: ''
    }
  },
  methods: {
    addProduct () {
      const newProduct = {
        name: this.productName,
        imageUrl: this.productUrl,
        price: this.productPrice,
        stock: this.productStock,
        categoryId: this.productCategory
      }

      console.log(newProduct)
      this.$store.commit('set_new_product', newProduct)
      this.$store.dispatch('addNewProduct')
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Success Adding New Product',
            text: `${newProduct.name} success added to the product list`
          })
          this.productName = ''
          this.productUrl = ''
          this.productPrice = ''
          this.productStock = ''
          this.$router.push({ name: 'product' })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text: `${err.response}`
          })
        })
    },
    getCategory () {
      this.$store.dispatch('getAllCategory')
    }
  },
  created () {
    this.getCategory()
  }
}
</script>

<style>
  .form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 22px;
  }

  .form-box {
      width: 65%;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 10px;
      -webkit-box-shadow: -1px 10px 13px -1px rgba(0,0,0,0.75);
      -moz-box-shadow: -1px 10px 13px -1px rgba(0,0,0,0.75);
      box-shadow: -1px 10px 13px -1px rgba(0,0,0,0.75);
      font-family: 'Bree Serif', serif;
      font-size: larger;
      margin: 10px;
  }
</style>
