<template>
  <div>
    <TableProduct :perPage="perPage" :pageOptions="pageOptions" />
  </div>
</template>

<script>
import TableProduct from '@/components/TableProduct.vue'

export default {
  name: 'DashboardProducts',
  components: {
    TableProduct
  },
  data () {
    return {
      perPage: '10',
      pageOptions: [10, 15, 20]
    }
  }
}
</script>

<style></style>
