<template>
  <div id="app">
    <div id="nav">
      <router-link to="/Login" v-if="!isLogin">Login</router-link>
      <a v-if="isLogin" href="" @click="logout">Logout</a>
      <router-link to="/Dashboard">Dashboard</router-link>
      <router-link to="/mycart" v-if="isLogin">My Cart</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      this.$store.commit('SET_LOGIN', false)
      localStorage.clear()
      this.$router.push({ name: 'Login' })
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
  padding: 3px;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
