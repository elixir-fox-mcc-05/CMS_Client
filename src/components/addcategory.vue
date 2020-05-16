<template>
  <v-app dark>
    <v-form @submit.prevent="add">
      <v-text-field
            v-model="name"
            label="Category Name :"
          ></v-text-field>
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
        data: {name: this.name},
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('addCategory', payload)
    }
  }
}
</script>

<style>

</style>
