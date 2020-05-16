<template>
  <div>
    <h3 class="center">Dashboard</h3>
    <NotifSection></NotifSection>
    <ErrorSection></ErrorSection>
    <div class="center">
      <router-link to="/product"><a>Products</a></router-link> |
      <router-link to="/dashboard"><a>Orders</a></router-link> |
      <router-link to="/dashboard"><a>Customers</a></router-link>
    </div>
    <router-view/>
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
