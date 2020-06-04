<template>
<div id="app">
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="isLogin">
      <a class="navbar-brand" href="#">MuStore WP Admin</a>
      <div class="btn btn-danger" id="log-out" v-on:click.prevent="logout">Logout</div>
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
      this.$router.push('/')
      this.$store.commit('set_login', false)
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('set_login', true)
    }
  }
}
</script>
