<template>
  <Login />
</template>

<script>
import Login from '@/components/Login.vue'
export default {
  name: 'LoginPage',
  components: {
    Login
  },
  created () {
    if (localStorage.access_token) {
      this.$router.push({ name: 'HomePage' })
    }
  }
}
</script>

<style>

</style>
