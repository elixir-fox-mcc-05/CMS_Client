<template>
  <div>
    <ProductList v-if="currentPage === 'productList'"></ProductList>
    <AddForm v-if="currentPage === 'addForm'"></AddForm>
    <updateForm v-if="currentPage === 'updateForm'"></updateForm>
  </div>
</template>
<script>
import ProductList from '../components/ProductList'
import AddForm from '../components/AddForm'
import updateForm from '../components/UpdateForm'
export default {
  components: {
    ProductList,
    AddForm,
    updateForm
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
