<template>
  <div>
    <Login/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'LandingPage',
  components: {
    Login
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$router.push('/MainPage')
    }
  }
}
</script>

<style>

</style>
