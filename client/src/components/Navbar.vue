<template>
    <nav class="navbar navbar-info bg-info justify-content-between border-bottom border-dark">
        <div>
          <h5 class="my-0"><strong>Products Management System</strong></h5>
          <a class="my-0"><strong>Indonesia Craft Shop</strong></a>
        </div>
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
