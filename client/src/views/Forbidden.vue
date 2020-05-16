<template>
  <div class="container-fluid" id="forbidden-page">
  </div>
</template>

<script>
export default {
  name: 'Forbidden',
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'LandingPage' })
    }
  }
}
</script>

<style>
  #forbidden-page {
    background-image: url('../assets/403.png');
    background-size: cover;
    width: 100%;
    height: 100vh;
  }
</style>
