<template>
  <datatable v-bind="$data" />
</template>

<script>
// import mockData from '../_mockData'
export default {
  name: 'categoryTable',
  data: () => ({
    columns: [
      { title: 'User ID', field: 'id', sortable: true },
      { title: 'Username', field: 'name' },
      { title: 'Age', field: 'age', sortable: true },
      { title: 'Email', field: 'email' },
      { title: 'Country', field: 'country' }
    ],
    data: [{ id: 1, name: 'aku', age: 20, email: 'aku', couny: 'indoneis' }],
    total: 0,
    query: {}
  }),
  computed: {
    prod () {
      return this.$store.state.products
    }
  },
  created () {
    console.log('created')
    this.$store.dispatch('fetchProduct')
    // this.prod = this.$store.state.products
    console.log('category start', this.$store.state.products)
    // this.dataitems = this.$store.state.products
    // this.$refs.vuetable.refresh()
    // console.log('created', this.dataitems, this.$store.state.products.data)
  }
  // watch: {
  //   query: {
  //     handler (query) {
  //       mockData(query).then(({ rows, total }) => {
  //         this.data = rows
  //         this.total = total
  //       })
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style>

</style>
