<template>
  <v-app id="inspire" dark>
    <b-col class="d-flex justify-content-between" style=" padding: 5px;">
      <b-row class="left" v-if="isLogin" style="padding-left:15px; padding-top:5px">
        <router-link to="/">Home</router-link>
      </b-row>
      <b-row v-if="!isLogin && !admin" style="display:flex;flex-direction:row">
        <div style="padding-right:15px; padding-left:15px">
          <router-link to="/login">Login</router-link>
        </div>
          <router-link to="/register">Register</router-link>
      </b-row>
      <b-row class="right" v-if="isLogin" style="padding-right:15px">
        <b-button variant="outline-info" class="mb-2" @click.prevent="logout">
          <b-icon icon="power"></b-icon> Logout
        </b-button>
      </b-row>
    </b-col>
    <router-view></router-view>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      admin: false
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
      this.$router.push('/')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN', true)
    }
    if (this.$route.fullPath === '/adminP4C5D9de2sr') {
      this.admin = true
    }
  }
}
</script>

<style>
  v-app {
    background: black;
  }
</style>
