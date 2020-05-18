<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Products</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" size="lg">Add Product</v-btn>
          </template>
          <v-card @keyup.native.enter.prevent="save">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text left>
              <v-container>
                <v-row left>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Product name"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.image_url" label="Product Image Url"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.price" label="Product Price"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.stock" label="Product Stock"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.CategoryId" label="Product Category Id"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click.prevent="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click.prevent="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click.prevent="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click.prevent="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        price: 0,
        stock: 0,
        image_url: '',
        CategoryId: 0,
        id: 0
      },
      defaultItem: {
        name: ''
      },
      itemsPerPage: 4,
      selected: [],
      items: [],
      categories: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Image Url',
          sortable: false,
          value: 'image_url'
        },
        {
          text: 'Price',
          sortable: true,
          value: 'price'
        },
        {
          text: 'Stock',
          sortable: true,
          value: 'stock'
        },
        {
          text: 'Category Id',
          sortable: false,
          value: 'CategoryId'
        },
        {
          text: 'Category Name',
          sortable: true,
          value: 'Categories.Name'
        },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      message: ''
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editItem.id = item.id
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      const payload = {
        token: localStorage.token,
        id: item.id
      }
      this.$store.dispatch('deleteProduct', payload)
        .then(({ data }) => {
          this.items.splice(index, 1)
          this.message = data.message
        })
        .catch(err => {
          this.message = err.response.data.msg
        })
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      const payload = {
        token: localStorage.getItem('token'),
        name: this.editedItem.name,
        price: this.editItem.price,
        stock: this.editItem.stock,
        image_url: this.editItem.image_url,
        CategoryId: this.editItem.CategoryId,
        id: this.editItem.id
      }
      if (this.editedIndex > -1) {
        this.$store.dispatch('editProduct', payload)
          .then(({ data }) => {
            return this.$store.dispatch('fetchProducts', localStorage.token)
          })
          .then(({ data }) => {
            this.items = data.Product
          })
          .catch(err => {
            this.message = err.response.data.msg
          })
      } else {
        this.$store.dispatch('addProduct', payload)
          .then(({ data }) => {
            this.items.push(data.Category)
          })
          .catch(err => {
            this.message = err.response.data.msg
          })
      }
      this.close()
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Products' : 'Edit Product'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.dispatch('fetchProducts', localStorage.token)
        .then(({ data }) => {
          this.items = data.Product
        })
        .catch(err => {
          this.message = err.response.data.msg
        })

      this.$store.dispatch('fetchCategories', localStorage.token)
        .then(({ data }) => {
          this.categories = data.Category
        })
        .catch(err => {
          this.message = err.response.data.msg
        })
    }
  }
}
</script>

<style>

</style>
