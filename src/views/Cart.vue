<template>
<div class="cart">
  <Navbar />
  <div class="title">
    <h1 style="color: white;">My Carts</h1><br><br>
  </div>
  <div class="d-flex flex-row justify-content-center flex-wrap">
    <ItemCarts v-for="item in carts" :key="item.id" :item="item" />
  </div>

</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import ItemCarts from '@/components/ItemCarts.vue'
export default {
  name: 'Cart',
  components: {
    Navbar,
    ItemCarts
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.$store.dispatch('getCarts')
  }

}
</script>

<style scoped>
.title {
  margin-top: 100px;
}
</style>
