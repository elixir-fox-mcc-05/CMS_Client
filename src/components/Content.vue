<template>
  <div class="container content">
     <router-view />
  </div>
</template>

<script>
export default {
  name: 'Content',
  created () {
    if (localStorage.access_token) {
      this.$store.commit('SET_SIGNED_IN', true)
      if (this.$route.path === '/') {
        this.$router.push('/dashboard')
      }
    } else {
      this.$store.commit('SET_SIGNED_IN', false)
      this.$router.push('/')
    }
  }
}
</script>

<style scope>
.content {
  margin-top: 75px;
  margin-bottom: 100px;
}
</style>
