<template>
  <graph-bar
            :width="600"
            :height="400"
            :axis-min="0"
            :axis-max="1500"
            :labels="[ 'Stock' ]"
            :values="prodstock">
        <note :text="'Bar Chart'"></note>
        <tooltip :names="prodname" :position="'left'"></tooltip>
        <legends :names="prodname" :filter="true"></legends>
    </graph-bar>
</template>

<script>
// import mockData from '../_mockData'
export default {
  name: 'categoryTable',
  data: () => ({
    // names: prodname,
    // values: prodstock
  }),
  computed: {
    prod () {
      return this.$store.state.products
    },
    prodname () {
      return this.$store.state.productnames
    },
    prodstock () {
      return this.$store.state.productstock
    }
  },
  created () {
    this.$store.dispatch('fetchProduct')
    console.log(this.prod)
  }

}
</script>

<style>

</style>
