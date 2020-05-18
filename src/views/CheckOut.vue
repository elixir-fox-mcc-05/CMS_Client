<template>
<div class="cart">
  <Navbar />
  <div class="title">
    <h1 style="color: white;">My Checkout Carts</h1><br><br>
  </div>
  <div class="d-flex flex-row justify-content-center flex-wrap">
    <CheckoutCarts v-for="product in checkouts" :key="product.id" :item="product" />
  </div>

</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import CheckoutCarts from '@/components/CheckoutCarts.vue'
export default {
  name: 'Cart',
  components: {
    Navbar,
    CheckoutCarts
  },
  computed: {
    checkouts () {
      return this.$store.state.checkouts
    }
  },
  created () {
    this.$store.dispatch('getCheckouts')
  }

}
</script>

<style scoped>
.title {
  margin-top: 100px;
}
</style>
