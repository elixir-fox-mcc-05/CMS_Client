<template>
  <div>
   <Dashboard/>
  </div>
</template>

<script>
import Dashboard from '../components/Dashboard.vue'

export default {
  name: 'MainPage',
  components: {
    Dashboard
  },
  created () {
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
