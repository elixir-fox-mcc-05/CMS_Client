<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h1>Products</h1>
        <ListProduct :products="products.products" />
      </div>
    </div>
  </div>
</template>

<script>
import ListProduct from '../components/ListProduct'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'MainPage',
  components: {
    ListProduct
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapMutations(['SET_LOGIN']),
    ...mapActions(['readAllProduct'])
  },
  created () {
    if (!localStorage.token) {
      this.$router.push('/')
      this.SET_LOGIN(false)
    } else {
      this.SET_LOGIN(true)
      this.readAllProduct(localStorage.token)
    }
  }
}
</script>

<style>

</style>
