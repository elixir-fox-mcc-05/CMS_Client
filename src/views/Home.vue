<template>
<div class="home">
  <Login></Login>
</div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Login
  },
  created () {
    if (localStorage.access_token) {
      this.$router.push({ name: 'dashboard' })
      this.$store.commit('set_login_status', true)
    } else {
      this.$router.push({ name: 'Home' })
      this.$store.commit('set_login_status', false)
    }
  }
}
</script>
