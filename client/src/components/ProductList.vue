<template>
  <div class="container">
    <h1>Product List</h1>
    <b-button variant="outline-primary" v-b-modal.add-product v-if="userRole != 'admin'">Add Product</b-button>
    <p class="text-success" v-if="successMessage">{{ successMessage }}</p>
    <table class="table table-bordered text-center">
      <thead>
        <th>No.</th>
        <th>Image</th>
        <th>Nama Product</th>
        <th>Harga</th>
        <th>Stok</th>
        <th>Kategori</th>
        <th colspan="2">Action</th>
      </thead>
      <tbody>
        <tr>
          <td colspan="8" v-if="!products.length">
            Anda belum menambahkan product
          </td>
        </tr>
        <tr v-for="(product,index) in products" :key="product.id">
          <td>{{ index += 1 }}</td>
          <td><img :src="product.image_url" alt="Product preview" class="img-thumbnail" width="200" height="200"></td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.Category.name }}</td>
          <td><router-link :to="`/dashboard/products/${product.id}`"><button class="btn btn-primary"><i class="fa fa-edit"></i> Detail</button></router-link> <b-button variant="danger" @click.prevent="showDelete(product)"><i class="fa fa-trash"></i> Delete</b-button></td>
        </tr>
      </tbody>
    </table>
    <AddProductModal />
    <DeleteProductModal :product="product" />
  </div>
</template>

<script>
import AddProductModal from './AddProductModal.vue'
import DeleteProductModal from './DeleteProductModal.vue'

export default {
  name: 'ProductList',
  data () {
    return {
      product: {}
    }
  },
  components: {
    AddProductModal,
    DeleteProductModal
  },
  methods: {
    showDelete (product) {
      this.product = product
      this.$root.$emit('bv::show::modal', 'delete-product')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    successMessage () {
      return this.$store.state.successMessage
    },
    userRole () {
      return this.$store.state.userRole
    }
  }
}
</script>

<style>

</style>
