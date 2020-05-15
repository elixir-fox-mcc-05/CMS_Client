<template>
  <div class="welcome">
    <h1>Welcome to Gober's Sporting Goods</h1>
    <h2>Let's gear up to start new season every day</h2>
    <br>
    <Banner/>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'

export default {
  name: 'Welcome',
  components: {
    Banner
  }
}
</script>

<style scoped>
  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 25px;
  }

  .logo {
    height: 240px;
  }

  h1, h2 {
    margin: 2px;
  }
</style>
