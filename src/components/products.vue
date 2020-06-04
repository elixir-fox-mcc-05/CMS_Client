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
            <v-btn color="black white--text" v-on="on" size="lg">Add Product</v-btn>
          </template>
          <v-card @keyup.native.enter.prevent="save">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text left>
              <v-container>
                <v-row left>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field :rules="nameRules" v-model="editedItem.name" label="Product name"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field :rules="imageRules" v-model="editedItem.image_url" label="Product Image Url"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field :rules="priceRules" type="number" v-model="editedItem.price" label="Product Price"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field :rules="stockRules" type="number" v-model="editedItem.stock" label="Product Stock"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-select
                    v-model="editedItem.CategoryId"
                    :items="categories"
                    item-text="name"
                    item-value="id"
                    :rules="categoryRules"
                    label="Category"
                  ></v-select>
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
        CategoryId: null,
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
          value: 'image_url',
          width: '20%'
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
          value: 'Category.name'
        },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      message: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      priceRules: [
        v => !!v || 'Price is required',
        v => typeof (v) !== 'number' || 'Price must be Integer'
      ],
      stockRules: [
        v => !!v || 'Stock is required',
        v => typeof (v) !== 'number' || 'Price must be Integer'
      ],
      imageRules: [
        v => !!v || 'Image is required'
      ],
      categoryRules: [
        v => !!v || 'Category is required'
      ]
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
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
        price: this.editedItem.price,
        stock: this.editedItem.stock,
        image_url: this.editedItem.image_url,
        CategoryId: this.editedItem.CategoryId,
        id: this.editedItem.id
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
            console.log(this.message)
          })
      } else {
        this.$store.dispatch('addProduct', payload)
          .then(({ data }) => {
            this.items.push(data.Product)
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
