<template>
  <div class="main">
    <ProductList></ProductList>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
export default {
  name: 'Product',
  components: {
    ProductList
  }

}
</script>

<style scoped>
  .main {
    display: flex;
  }
</style>
