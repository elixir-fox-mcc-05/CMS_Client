<template>
  <div class="home">
    <Header></Header>
    <Landing msg="Welcome"/>
    <Footer></Footer>

    <Login></Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Landing from '@/components/Landing.vue'
import Header from '@/components/primary/Header.vue'
import Footer from '@/components/primary/Footer.vue'
import Login from '../components/login/Login.vue'

export default {
  name: 'Home',
  components: {
    Landing,
    Header,
    Footer,
    Login
  }
}
</script>

<style scoped>

</style>
