<template>

</template>

<script>
export default {
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN', true)
    } else {
      this.$router.push('/user/login')
    }
  }
}
</script>

<style>

</style>