<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
    <div class="container">
      <a class="navbar-brand" href="#">Navbar</a>
      <ul class="navbar-nav">
        <li class="nav-item">
            <a @click.prevent="logout" v-show="isLogin" class="nav-link" href="#">Logout</a>
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
