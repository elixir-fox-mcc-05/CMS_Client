<template>
  <div class="container">
    <h5 class="text-success" v-if="successMessage">{{ successMessage }}</h5>
    <div class="row">
      <h1 class="col-12">{{ product.name }}</h1>
      <img class="col-4 img-thumbnail" :src="product.image_url" alt="preview product"/>
      <div class="col-8">
        <h5>Product Stock</h5>
        <span>{{ product.stock }}</span>
        <h5>Product Price</h5>
        <span>{{ product.price }}</span>
        <h5>Kategori</h5>
        <span>{{ categoryProduct.name }}</span>
        <div class="col-3">
          <b-button variant="outline-primary" v-b-modal.edit-product>Edit Product</b-button>
        </div>
      </div>
    </div>
    <b-modal id="edit-product" title="Edit Product" :hide-footer="hideFooter">
      <b-form @submit.prevent="editProduct">
          <b-form-group label="Product Name:" label-for="name">
            <b-form-input
              id="name"
              v-model="product.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Image Url:" label-for="image_url">
            <b-form-input
              id="image_url"
              v-model="product.image_url"
              required
              placeholder="Image Url"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Price:" label-for="price">
            <b-form-input type="number"
              id="price"
              v-model="product.price"
              required
              placeholder="Price"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Stock:" label-for="stock">
            <b-form-input type="number"
              id="stock"
              v-model="product.stock"
              required
              placeholder="Stock"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Category:" label-for="category">
            <b-form-select
              id="input-3"
              v-model="categoryProduct.id"
              required
            >
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </b-form-select>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-modal>
  </div>
</template>

<script>
import server from '../api'

export default {
  name: 'DetailProduct',
  data () {
    return {
      product: {},
      hideFooter: true,
      categoryProduct: {}
    }
  },
  methods: {
    getProduct () {
      server.get(`/products/${this.$route.params.id}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data.Product)
          this.product = data.Product
          this.categoryProduct = data.Product.Category
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct () {
      console.log('disini')
      const payload = {
        name: this.product.name,
        image_url: this.product.image_url,
        price: this.product.price,
        stock: this.product.stock,
        CategoryId: this.categoryProduct.id
      }
      console.log(payload)
      server.put(`/products/${this.product.id}`, payload, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.commit('SET_SUCCESS', 'Berhasil Mengubah Product')
          this.$root.$emit('bv::hide::modal', 'edit-product')
          setTimeout(() => {
            this.$store.commit('SET_SUCCESS', '')
          }, 5000)
          this.$store.dispatch('getAllProducts')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  created () {
    this.getProduct()
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    successMessage () {
      return this.$store.state.successMessage
    }
  }
}
</script>

<style>

</style>
