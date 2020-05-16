<template>
  <b-modal id="add-product" title="Add Product" :hide-footer="hideFooter">
    <b-form @submit.prevent="addProduct">
        <b-form-group label="Product Name:" label-for="name">
          <b-form-input
            id="name"
            v-model="name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Image Url:" label-for="image_url">
          <b-form-input
            id="image_url"
            v-model="image_url"
            required
            placeholder="Image Url"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Price:" label-for="price">
          <b-form-input type="number"
            id="price"
            v-model="price"
            required
            placeholder="Price"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Stock:" label-for="stock">
          <b-form-input type="number"
            id="stock"
            v-model="stock"
            required
            placeholder="Stock"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Category:" label-for="category">
          <b-form-select
            id="input-3"
            v-model="category"
            required
          >
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
  </b-modal>
</template>

<script>
import server from '../api'

export default {
  name: 'AddProductModal',
  data () {
    return {
      name: '',
      image_url: '',
      price: 0,
      stock: 0,
      category: 1,
      hideFooter: true
    }
  },
  methods: {
    addProduct () {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        CategoryId: this.category
      }
      console.log(payload)
      server.post('/products', payload, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$store.commit('SET_SUCCESS', 'Berhasil Menambahkan Product')
          this.$root.$emit('bv::hide::modal', 'add-product')
          setTimeout(() => {
            this.$store.commit('SET_SUCCESS', '')
          }, 2000)
          this.name = ''
          this.image_url = ''
          this.price = 0
          this.stock = 0
          this.category = 1
          this.$refs.addProduct.hide()
          this.$store.dispatch('getAllProducts')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  created () {
    this.$store.dispatch('getCategories')
      .finally(_ => {
        console.log('Got em')
      })
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  }
}
</script>

<style>

</style>
