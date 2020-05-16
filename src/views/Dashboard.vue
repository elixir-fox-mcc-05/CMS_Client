<template>
  <div class="container">
    <DashboardHeader />
    <TableProduct />
  </div>
</template>

<script>
import DashboardHeader from '@/components/DashboardHeader.vue'
import TableProduct from '@/components/TableProduct.vue'

export default {
  name: 'Dashboard',
  components: {
    TableProduct,
    DashboardHeader
  }
}
</script>

<style></style>
