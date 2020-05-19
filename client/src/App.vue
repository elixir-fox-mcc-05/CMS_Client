<template>
  <div id="app">
    <Navbar v-if='isLogin' />
    <router-view class='mt-5' />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    ...mapState(['isLogin'])
  }
}
</script>

<style >
</style>
