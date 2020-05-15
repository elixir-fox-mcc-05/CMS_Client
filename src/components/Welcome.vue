<template>
  <div class="welcome">
    <!-- <img src="../assets/gobers-logo.png" alt="gobers logo" class="logo"> -->
    <h1>Welcome to Gober's Sporting Goods</h1>
    <h2>Let's gear up to start new season every day</h2>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style scoped>
  .welcome {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .logo {
    height: 240px;
  }

  h1, h2 {
    margin: 2px;
  }
</style>
