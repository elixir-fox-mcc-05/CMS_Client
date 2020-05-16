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
</style>
