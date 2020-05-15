<template>
  <nav v-if="isSignedIn" class="navbar fixed-top navbar-dark bg-dark">
    <a class="navbar-brand">CMS Dashboard</a>
    <router-link to="/"
      ><button @click="signOut" type="button" class="btn btn-danger">
        SIGN OUT
      </button></router-link
    >
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  methods: {
    signOut () {
      this.$store.commit('SET_SIGNED_IN', false)
      localStorage.clear()
    }
  },
  computed: {
    isSignedIn () {
      return this.$store.state.isSignedIn
    }
  }
}
</script>

<style></style>
