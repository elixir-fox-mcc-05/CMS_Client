<template>
  <div class="landing-page">
    <Login v-if="toggleLogin"/>
    <Register v-else-if="!toggleLogin" />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'LandingPage',
  components: {
    Login,
    Register
  },
  computed: {
    toggleLogin () {
      return this.$store.state.toggleLogin
    }
  },
  created () {
    if (localStorage.token) {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>
