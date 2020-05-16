<template>
  <div>
    <img src="../assets/logoSneaker.png" style="width: 70%;">
    <Signin/>
  </div>
</template>

<script>
// @ is an alias to /src
import Signin from '@/components/Signin.vue'

export default {
  name: 'LandingPage',
  components: {
    Signin
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$router.push({ name: 'MainPage' })
    }
  }
}
</script>
