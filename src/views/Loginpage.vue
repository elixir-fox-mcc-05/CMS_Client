<template>
<div class="Loginpage">
  <Login v-if="!reg" />
  <Register v-if="log && reg" />
</div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'Loginpage',
  components: {
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
  },
  created () {
    if (localStorage.access_token) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.Loginpage {
  margin-top: 100px;
  text-align: center;
  width: 100%;
}

.space {
  height: 75px;
}
</style>
