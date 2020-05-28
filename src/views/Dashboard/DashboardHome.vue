<template>
  <div>
    <DashboardHeader />
    <TableProduct :perPage="perPage" :pageOptions="pageOptions" />
  </div>
</template>

<script>
import DashboardHeader from '@/components/DashboardHeader.vue'
import TableProduct from '@/components/TableProduct.vue'

export default {
  name: 'DashboardHome',
  components: {
    DashboardHeader,
    TableProduct
  },
  data () {
    return {
      perPage: 2,
      pageOptions: [2, 5]
    }
  }
}
</script>

<style></style>
