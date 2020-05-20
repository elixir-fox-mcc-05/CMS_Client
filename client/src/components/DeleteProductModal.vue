<template>
  <b-modal :id="`delete-product`" title="Delete Product" :hide-footer="hideFooter">
    <b-form @submit.prevent="deleteProduct(product.id)">
      <b-form-group>
        Delete Product {{ product.name }} ?
      </b-form-group>
      <b-button type="submit" variant="danger">Delete</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import server from '../api'

export default {
  name: 'DeleteProductModal',
  props: {
    product: Object
  },
  data () {
    return {
      hideFooter: true
    }
  },
  methods: {
    deleteProduct (id) {
      console.log('disini')
      server.delete(`/products/${id}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.commit('SET_SUCCESS', 'Berhasil Menghapus Product')
          this.$root.$emit('bv::hide::modal', 'delete-product')
          setTimeout(() => {
            this.$store.commit('SET_SUCCESS', '')
          }, 2000)
          this.$store.dispatch('getAllProducts')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style>

</style>
