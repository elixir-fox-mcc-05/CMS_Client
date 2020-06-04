<template>
<v-container>
<v-data-table
    :headers="headers"
    :items="products"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My Products</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog max-width="500px">
          <template>
            <v-btn color="primary" dark class="mb-2" link router to="/AddProduct">New Product</v-btn>
          </template>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{item}">
      <v-icon
        small
        @click.prevent="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">See Products</v-btn>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
import axios from 'axios'
const baseUrl = 'https://lit-badlands-37387.herokuapp.com/'

export default {
  name: 'MainPage',
  data: () => ({
    message: '',
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: true,
        value: 'id'
      },
      { text: 'Name', value: 'name' },
      { text: 'Stock', value: 'stock' },
      { text: 'Type', value: 'Category.type' },
      { text: 'Price', value: 'price' },
      { text: 'Image Url', value: 'imageUrl' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    products: []
  }),

  computed: {
    Products () {
      return this.$store.state.products
    }
  },
  created () {
    this.initialize()
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    } else {
      this.$store.dispatch('fetchProducts')
      this.$store.commit('set_login', true)
    }
  },

  methods: {
    initialize () {
      this.products = this.$store.state.products
    },
    deleteItem (item) {
      axios({
        method: 'delete',
        url: baseUrl + 'products/' + item.id,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          setTimeout(() => {
            this.$store.dispatch('fetchProducts')
            this.message = ''
          }, 2000)
          this.message = data.message
        })
        .catch(err => {
          setTimeout(() => {
            this.message = ''
          }, 2000)
          this.message = err.response.data.message
        })
    }
  }
}
</script>

<style>

</style>
