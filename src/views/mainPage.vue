<template>
  <div>
   <mainPage/>
  </div>
</template>

<script>
import mainPage from '../components/mainPage.vue'
export default {
  name: 'MainPage',
  components: {
    mainPage
  },
  created () {
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'LandingPage' })
    }
  }
}
</script>

<style>

</style>
