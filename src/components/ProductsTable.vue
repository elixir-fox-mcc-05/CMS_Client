<template>
  <div id="productsTable">
    <table class="highlight">
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
            <router-link :to="`/product/${product.id}/edit`"><button class="btn btn-small"><i class="material-icons">edit</i></button></router-link> |
            <button class="btn btn-small" @click.prevent="deleteProduct(product.id)"><i class="material-icons">delete</i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import server from '../api/index'

export default {
  name: 'ProductsTable',
  computed: {
    productsList () {
      return this.$store.state.productsList
    }
  },
  methods: {
    deleteProduct (id) {
      server({
        method: 'delete',
        url: `/product/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
          this.$router.push({ name: 'ProductsTable' })
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    }
  },
  created () {
    this.$store.dispatch('fetchProductsList')
  }
}
</script>

<style scoped>
  #productsTable {
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
