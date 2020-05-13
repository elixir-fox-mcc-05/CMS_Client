<template>
  <div class="home">
    <Navbar />
    <Login v-if="!log && !reg" />
    <Register v-if="log && reg" />
    <Content/>
  </div>
</template>

<script>
// @ is an alias to /src
import Content from '@/components/Content.vue'
import Navbar from '@/components/Navbar.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'Home',
  components: {
    Content,
    Navbar,
    Login,
    Register
  },
  computed: {
    log () {
      return this.$store.state.hideLogin
    },
    reg () {
      return this.$store.state.showRegister
    }
  }
}
</script>
<style scoped>
.home{
  width: 100%;
}
</style>
