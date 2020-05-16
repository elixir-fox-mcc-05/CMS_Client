<template>
  <div>
    <ProductList v-show="currentPage === 'productList'"></ProductList>
    <AddForm v-show="currentPage === 'addForm'"></AddForm>
  </div>
</template>
<script>
import ProductList from '../components/ProductList'
import AddForm from '../components/AddForm'
export default {
  components: {
    ProductList,
    AddForm
  },
  computed: {
    currentPage () {
      return this.$store.state.currentPage
    }
  }
}
</script>
<style>
</style>
