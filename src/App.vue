<template>
  <v-app>
    <v-content>
      <Navbar v-if="isLogin" />
    <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
    //
  }),
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
  }
}
</script>
