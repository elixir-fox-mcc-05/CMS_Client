<template>
  <v-data-table
    :headers="headers"
    :items="categories"
    hide-default-header
    hide-default-footer
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: 'category',
  data () {
    return {
      itemsPerPage: 4,
      selected: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name'
        }
      ]
    }
  },
  computed: {
    categories () {
      console.log('triger')
      return this.$store.state.categories
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
