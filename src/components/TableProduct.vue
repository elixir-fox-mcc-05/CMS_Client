<template>
  <div>
    <div>
      <h3>Products</h3>
      <b-table
        id="products"
        :items="items"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        responsive="sm"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template v-slot:cell(id)="data">
          <b-button variant="outline-warning" @click="updateProduct(data.value)"
            >Edit</b-button
          >
          -
          <b-button variant="outline-danger" @click="deleteProduct(data.value)"
            >Delete</b-button
          >
        </template>
      </b-table>
    </div>
    <div class="d-flex justify-content-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
    <!-- // ========================== // Modal // ========================== -->
    <div>
      <b-modal id="modal-edit" ref="modal-edit" title="Edit Product">
        <template v-slot:modal-footer>
          <div class="w-100 h-auto"></div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableProduct',
  data () {
    return {
      idProduct: '',
      show: false,
      perPage: 5,
      currentPage: 1,
      sortBy: 'id',
      sortDesc: false,
      fields: [
        { key: 'Name', sortable: true },
        { key: 'Image', sortable: false },
        { key: 'Price', sortable: true },
        { key: 'Stock', sortable: true },
        { key: 'id', label: 'Options' }
      ]
    }
  },
  methods: {
    fetchProducts () {
      this.$store
        .dispatch('fetchProducts')
        .then(({ data }) => {
          this.$store.commit('SET_ITEMS', data.Products)
        })
        .catch(({ err }) => {
          console.log(err)
        })
    },
    deleteProduct (id) {
      this.$store
        .dispatch('deleteProduct', id)
        .then(({ data }) => {
          this.fetchProducts()
        })
        .catch(({ err }) => {
          console.log(err)
        })
    },
    updateProduct (id) {
      this.idProduct = id
      this.$refs['modal-edit'].show()
    },
    closeModal () {
      this.$refs['modal-edit'].hide()
    }
  },
  computed: {
    items () {
      const products = []
      this.$store.state.items.forEach(el => {
        products.push({
          Name: el.name,
          Image: el.image_url,
          Price: el.price,
          Stock: el.stock,
          id: el.id
        })
      })
      //  console.log('INI ITEMS ', this.$store.state.items)
      //  console.log('INI PRODUCTS ', products)
      return products
    },
    rows () {
      return this.items.length
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style></style>
