<template>
    <div class="LandingPage">
        <Login />
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
    if (localStorage.token) {
      this.$router.push('Home')
    }
  }
}
</script>

<style>

</style>
