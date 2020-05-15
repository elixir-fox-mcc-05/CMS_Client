<template>
  <router-view />
</template>

<script>
export default {
  name: 'Content',
  created () {
    if (localStorage.access_token) {
      this.$store.commit('SET_SIGNED_IN', true)
      this.$router.push('/dashboard')
    } else {
      this.$store.commit('SET_SIGNED_IN', false)
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
