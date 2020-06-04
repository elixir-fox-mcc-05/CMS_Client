<template>
  <v-container>
      <p align="center"> {{message}} </p>
      <form>
    <v-text-field
      v-model="name"
      :counter="30"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="price"
      label="Price .."
    ></v-text-field>
    <v-text-field
      v-model="stock"
      label="Stock .."
    ></v-text-field>
    <v-text-field
      v-model="imageUrl"
      label="Image Url .."
    ></v-text-field>
    <v-select
      v-model="CategoryId"
      :items="Categories"
      item-value="id"
      item-text="type"
      menu-props="auto"
      label="Item"
    ></v-select>

    <v-btn class="mr-4" @click.prevent="createProduct">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import axios from 'axios'
const baseUrl = 'https://lit-badlands-37387.herokuapp.com/'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(30) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },

  data: () => ({
    name: '',
    price: null,
    stock: null,
    imageUrl: '',
    CategoryId: null,
    message: ''
  }),

  computed: {
    Categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
    createProduct () {
      axios({
        method: 'post',
        url: baseUrl + 'products',
        data: {
          name: this.name,
          price: this.price,
          imageUrl: this.imageUrl,
          stock: this.stock,
          CategoryId: this.CategoryId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          setTimeout(() => {
            this.message = ''
          }, 2000)
          this.message = 'Successfully adding product'
        })
        .catch(err => {
          setTimeout(() => {
            this.message = ''
          }, 2000)
          this.message = err.response.data.message
        })
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('fetchCategory')
      this.$store.commit('set_login', true)
    }
  }
}
</script>

<style>

</style>
