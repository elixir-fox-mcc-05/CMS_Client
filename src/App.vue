<template>
  <div id="app">
    <!-- <div id="nav" v-if="currentlyLoggedIn">
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/addProduct">Add A Product</router-link> |
      <a href="#" @click="logout">Log out</a>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
  },
  computed: {
    currentlyLoggedIn () {
      return this.$store.state.currentlyLoggedIn
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('set_currentlyLoggedIn', true)
    } else {
      this.$store.commit('set_currentlyLoggedIn', false)
      this.$router.push('/')
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
