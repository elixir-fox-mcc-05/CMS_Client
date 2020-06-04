<template>
  <v-data-table
    :headers="headers"
    :items="Categories"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Categories</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="black white--text" v-on="on" size="lg">Add Category</v-btn>
          </template>
          <v-card @keyup.native.enter.prevent="save">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" :rules="nameRules" label="Category name"></v-text-field>
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
        id: 0
      },
      defaultItem: {
        name: ''
      },
      itemsPerPage: 4,
      selected: [],
      items: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Product',
          value: 'Products.length'
        },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      message: '',
      nameRules: [
        v => !!v || 'Name is required'
      ]
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
      this.$store.dispatch('deleteCategory', payload)
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
        id: this.editItem.id
      }
      if (this.editedIndex > -1) {
        this.$store.dispatch('editCategory', payload)
          .then(({ data }) => {
            this.$store.dispatch('fetchCategories', localStorage.token)
          })
          .catch(err => {
            this.message = err.response.data.msg
          })
      } else {
        this.$store.dispatch('addCategory', payload)
      }
      this.close()
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Category' : 'Edit Category'
    },
    Categories () {
      return this.$store.state.categories
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.dispatch('fetchCategories', localStorage.token)
    }
  }
}
</script>

<style>

</style>
