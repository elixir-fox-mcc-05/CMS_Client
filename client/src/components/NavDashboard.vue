<template>
  <el-button type="danger" @click="signOut" plain>Sign Out</el-button>
</template>

<script>
export default {
  name: 'NavDashboard',
  methods: {
    signOut () {
      localStorage.removeItem('access_token')
      this.$store.commit('SET_IS_LOGIN', false)
      this.$store.commit('SET_IS_ADMIN', false)
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
</style>
