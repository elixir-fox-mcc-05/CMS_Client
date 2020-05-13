<template>
  <div>
    <h3 class="center">Dashboard</h3>
    <NotifSection></NotifSection>
    <ErrorSection></ErrorSection>
    <div class="center">
      <a>Products</a> |
      <a>Product Categories</a>
    </div>
  </div>
</template>

<script>
import NotifSection from '../components/NotifSection'
import ErrorSection from '../components/ErrorSection'

export default {
  name: 'Dashboard',
  components: {
    NotifSection, ErrorSection
  },
  computed: {
    productsList () {
      return this.$store.state.productsList
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'LandingPage' })
    } else {
      this.$store.dispatch('fetchProductsList')
    }
  }
}
</script>

<style>

</style>
