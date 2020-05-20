<template>
  <div>
    <b-form @submit.prevent="updateProduct">
      <b-form-group id="input-group-1" label="Product name:" label-for="name">
        <b-form-input
          id="name"
          v-model="selectedProduct.name"
          type="text"
          required
          placeholder="eg. iced cappucino"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Image URL:" label-for="image">
        <b-form-input
          id="image"
          v-model="selectedProduct.image_url"
          type="url"
          required
          placeholder="http://yourimage.url"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Price:" label-for="price">
        <b-form-input
          id="price"
          v-model="selectedProduct.price"
          type="number"
          required
          placeholder="eg. 10000"
          min="1"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Stock:" label-for="stock">
        <b-form-input
          id="stock"
          v-model="selectedProduct.stock"
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
  name: 'FormUpdateProduct',
  props: ['selectedProduct'],
  methods: {
    fetchProducts () {
      this.$store
        .dispatch('fetchProducts')
        .then(({ data }) => {
          this.$store.commit('SET_PRODUCTS', data.Products)
        })
        .catch(({ err }) => {
          console.log(err)
        })
    },
    updateProduct () {
      const payload = {
        data: {
          name: this.selectedProduct.name,
          image_url: this.selectedProduct.image_url,
          price: this.selectedProduct.price,
          stock: this.selectedProduct.stock
        },
        id: this.selectedProduct.id
      }
      this.$store
        .dispatch('updateProduct', payload)
        .then(({ data }) => {
          const updateProductName = data.UpdatedProduct.name
          this.fetchProducts()
          this.$emit('closeModal')
          this.$swal.fire(
            `Success update "${updateProductName}"`,
            'You just updated a product!',
            'success'
          )
        })
        .catch(({ err }) => {
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
