<template>
    <nav class="navbar navbar-info bg-info justify-content-between">
        <h5 class="">Products Management System</h5>
        <button class="btn btn-dark" type="button" @click.prevent="logout">LOGOUT</button>
    </nav>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Navbar',
  methods: {
    ...mapMutations(['SET_LOGIN']),
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'Landing' })
      this.SET_LOGIN(false)
    }
  }
}
</script>

<style >
</style>
