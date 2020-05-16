<template>
  <div class="container">
        <h1>Dashboard</h1>
        <button type="button" class="btn btn-secondary" id="button-add">Add Product</button><br><br>
        <fetchProduct />
    </div>
</template>

<script>
import fetchProduct from '@/components/fetchProduct.vue'
export default {
  name: 'HomePage',
  components: {
    fetchProduct
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'LoginPage' })
    }
  },
  created () {
    if (!localStorage.access_token) {
      this.$router.push({ name: 'LoginPage' })
    }
  }
}
</script>

<style>

</style>
