<template>
  <div>
    <p>Products Table</p>
    <div id="container center">
      <table>
        <thead>
          <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price (Rp)</th>
              <th>Action</th>
          </tr>
        </thead>

        <tbody v-for="product in productsList" :key="product.id">
          <tr>
            <td>{{ product.id }}</td>
            <td>
              <router-link :to="`/product/${product.id}`">
              {{ product.name }}
              </router-link>
            </td>
            <td>{{ product.category }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.price }}</td>
            <td>
              <router-link :to="`/product/${product.id}/edit`"><i class="material-icons">edit</i></router-link>  |
              <a href=""><i class="material-icons">delete</i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsTable',
  computed: {
    productsList () {
      return this.$store.state.productsList
    }
  },
  created () {
    this.$store.dispatch('fetchProductsList')
  }
}
</script>

<style>

</style>
