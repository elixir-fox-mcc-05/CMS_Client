<template>
  <div class="container">
    <button @click.prevent="showAddForm" class="btn btn-primary" type="button">Add</button>
    <table class="table table-sm table-hover table-striped">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, i) in products" :key="i">
          <td><img :src="`${product.image_url}`" alt=""></td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td class="btn-action">
            <button class="btn btn-primary" type="button">Edit</button>
            <button class="btn btn-primary" type="button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    showAddForm () {
      this.$store.commit('changeCurrentPage', 'addForm')
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
    img {
        width: 150px;
        height: 200px;
    }
    btn-action {
        display: flex;
        flex-direction: column !important;
    }
</style>
