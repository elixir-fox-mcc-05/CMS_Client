<template>
  <div id="app">
    <div id="nav">
      <div class="navbar-fixed">
        <nav class="blue darken-3">
          <div class="container">
            <div class="nav-wrapper">
              <router-link to="/">E-Commerce</router-link>
              <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
              <ul class="right hide-on-med-and-down">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/dashboard">Dashboard</router-link></li>
                <li><a @click.prevent="logoutUser">Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <ul class="sidenav" id="mobile-demo">
          <router-link to="/">Home</router-link>
          <router-link to="/dashboard">Dashboard</router-link>
        </ul>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min.js'

export default {
  name: 'App',
  methods: {
    changeLoginStatus () {
      this.$store.commit('changeLoginStatus')
    },
    logoutUser () {
      localStorage.clear()
      this.changeLoginStatus()
      this.$router.push({ name: 'LandingPage' })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  mounted () {
    // sidebar
    const sidenav = document.querySelectorAll('.sidenav')
    M.Sidenav.init(sidenav)
  }
}
</script>

<style>

</style>
