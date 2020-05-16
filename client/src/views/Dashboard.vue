<template>
  <div class="container-fluid p-4">
    <Sidebar v-if="$route.name !== 'LandingPage'"/>
    <router-view />
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'Dashboard',
  components: {
    Sidebar
  },
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'LandingPage' })
    } else {
      this.$store.commit('SET_LOGIN', true)
      this.$store.commit('SET_ROLE', localStorage.userRole)
      this.$store.dispatch('getAllProducts')
        .finally(_ => {
          console.log('Got em')
        })
      this.$store.dispatch('getCategories')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>
