<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
    <div class="container">
      <a @click.prevent="nothing" class="navbar-brand" href="">E-commerce<i class="fas fa-shopping-basket ml-2"></i> </a>
      <ul class="navbar-nav">
        <li class="nav-item">
            <a @click.prevent="logout" v-show="isLogin" class="nav-link" href="#">Logout</a>
        </li>
        <li class="nav-item">
            <a @click.prevent="showLogin" v-show="!isLogin" class="nav-link" href="#">Login</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('changeLoginStatus', false)
      this.$router.push('/')
    },
    showLogin () {
      this.$store.commit('showLoginForm', true)
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>
<style>

</style>
