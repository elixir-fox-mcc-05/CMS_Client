<template>
  <div>
    <b-form @submit.prevent="createProduct">
      <b-form-group id="input-group-1" label="Product name:" label-for="name">
        <b-form-input
          id="name"
          v-model="name"
          type="text"
          placeholder="eg. iced cappucino"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Image URL:" label-for="image">
        <b-form-input
          id="image"
          v-model="image_url"
          type="url"
          placeholder="http://yourimage.url"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Price:" label-for="price">
        <b-input-group prepend="Rp" append=".00">
        <b-form-input
          id="price"
          v-model="price"
          type="number"
          placeholder="eg. 10000"
        >
        </b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group id="input-group-4" label="Stock:" label-for="stock">
        <b-form-input
          id="stock"
          v-model="stock"
          type="number"
          placeholder="eg. 10"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="dark">Submit</b-button>
    </b-form>
    <br />
    <div v-if="createProductError">
      <b-alert variant="warning" show><p v-for="error in createProductErrorMessage" :key="error.message">!-- {{ error.message }}</p></b-alert>
    </div>
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
      stock: '',
      createProductError: false,
      createProductErrorMessage: []
    }
  },
  methods: {
    fetchProducts () {
      this.$store
        .dispatch('fetchProducts')
        .then(({ data }) => {
          this.$store.commit('SET_PRODUCTS', data.Products)
        })
        .catch((err) => {
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
          const newAddedProductName = data.CreatedProduct.name
          this.fetchProducts()
          this.$emit('closeModal')
          this.$swal.fire(
            `Success add "${newAddedProductName}"`,
            'You just added a new product!',
            'success'
          )
        })
        .catch((err) => {
          this.createProductError = true
          this.createProductErrorMessage = ''
          const manyError = Array.isArray(err.response.data.message)
          const arr = []
          if (manyError) {
            for (let i = 0; i < err.response.data.message.length; i++) {
              arr.push(err.response.data.message[i])
            }
            this.createProductErrorMessage = arr
          } else {
            this.createProductErrorMessage += '!-- ' + err.response.data.message
          }
        })
    },
    closeModal () {
      this.$refs['modal-create'].hide()
    }
  }
}
</script>

<style></style>
