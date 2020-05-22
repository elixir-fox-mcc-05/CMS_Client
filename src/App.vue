<template>
  <div id="app" >
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="isLogin">
      <a class="navbar-brand" href="#">Sneakers</a>
      <div class="btn btn-dark ml-auto" id="log-out" v-on:click.prevent="logout" >Logout</div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'LandingPage' })
      this.$store.commit('set_login', false)
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
