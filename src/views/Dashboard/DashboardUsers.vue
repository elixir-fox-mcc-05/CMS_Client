<template>
  <div>
    <TableUser :perPage="perPage" :pageOptions="pageOptions" />
  </div>
</template>

<script>
import TableUser from '@/components/TableUser.vue'

export default {
  name: 'DashboardUsers',
  components: {
    TableUser
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
