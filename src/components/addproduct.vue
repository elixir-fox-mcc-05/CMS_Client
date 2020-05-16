<template>
  <v-app dark>
    <v-form @submit.prevent="add">
      <v-text-field
            v-model="name"
            label="Category Name :"
      ></v-text-field>
      <v-text-field
            v-model="image_url"
            label="Category Name :"
      ></v-text-field>
      <v-number-field
            v-model="stock"
            label="Category Name :"
      ></v-number-field>
      <v-number-field
            v-model="price"
            label="Category Name :"
      ></v-number-field>
      <v-select
          :items="items"
          filled
          label="Filled style"
        ></v-select>
      <v-button fluid
              type="submit"> Create
      </v-button>
    </v-form>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    add () {
      const payload = {
        name: this.name,
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('addProducts', payload)
    }
  }
}
</script>

<style>

</style>
