<template>
  <div>
    <b-form @submit.prevent="createProduct">
      <b-form-group id="input-group-1" label="Product name:" label-for="name">
        <b-form-input
          id="name"
          v-model="name"
          type="text"
          required
          placeholder="eg. iced cappucino"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Image URL:" label-for="image">
        <b-form-input
          id="image"
          v-model="image_url"
          type="url"
          required
          placeholder="http://yourimage.url"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Price:" label-for="price">
        <b-form-input
          id="price"
          v-model="price"
          type="number"
          required
          placeholder="eg. 10000"
          min="1"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Stock:" label-for="stock">
        <b-form-input
          id="stock"
          v-model="stock"
          type="number"
          required
          placeholder="eg. 10"
          min="1"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="dark">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'FormCreateProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  methods: {
    fetchProducts () {
      this.$store
        .dispatch('fetchProducts')
        .then(({ data }) => {
          this.$store.commit('SET_ITEMS', data.Products)
        })
        .catch(({ err }) => {
          console.log(err)
        })
    },
    createProduct () {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      }
      this.$store
        .dispatch('createProduct', payload)
        .then(({ data }) => {
          console.log(data.CreatedProduct)
          this.fetchProducts()
        })
        .catch(({ err }) => {
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
