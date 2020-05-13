<template>
  <div>
    <div class="container">
      <div class="col m2">
        <h4>Products</h4>
        <div>
          <router-link to="/product/show_all"><a>Show All Products</a></router-link> |
          <router-link to="/product/add_product"><a>Add Product</a></router-link> |
        </div>
      </div>
      <div class="col m10">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  computed: {
    productsList () {
      return this.$store.state.productsList
    }
  }
}
</script>

<style>

</style>
