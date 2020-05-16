<template>
    <nav class="navbar navbar-info bg-info justify-content-between">
        <h5 class="">Products Management System</h5>
        <button class="btn btn-dark" type="button" @click.prevent="logout">LOGOUT</button>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'Landing' })
      this.$store.commit('SET_LOGIN', false)
    }
  }
}
</script>

<style >
</style>
