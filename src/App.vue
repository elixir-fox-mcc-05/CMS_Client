<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>

import navbar from './components/Navbar'

export default {
  components: {
    navbar
  },
  methods: {
    checkLoginStatus () {
      if (localStorage.getItem('token')) {
        this.$store.commit('changeLoginStatus', true)
        this.$store.dispatch('fetchProducts')
        this.$router.push('/dashboard')
      }
    }
  },
  created () {
    this.checkLoginStatus()
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald&family=Roboto&display=swap');
  body {
    font-family: 'Roboto';
  }
</style>
