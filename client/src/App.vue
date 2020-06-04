<template>
  <div id="app">
    <Navbar v-if='isLogin' />
    <router-view class='mt-5' />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar, Footer
  },
  computed: {
    ...mapState(['isLogin'])
  }
}
</script>

<style >
</style>
