<template>
  <div class="container mb-5">
    <div class="row">
      <div class="col-lg-12">
        <h1>List All Product</h1>
        <div class="text-center">
          <button class="btn btn-info mt-xl-0 my-3" type="button" @click="toAddProduct">Add Product</button>
        </div>
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
    ...mapActions(['readAllProduct']),
    toAddProduct () {
      this.$router.push('/add')
    }
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
