<template>
   <nav class="navbar sticky-top navbar-expand-lg navbar-dark" style="background-color: #111;">
    <router-link to="/dashboard" class="btn btn-link"><span>CMS Client</span></router-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/dashboard" class="btn btn-link">Home</router-link>
        </li>
      </ul>
      <button class="btn btn-danger my-2 my-sm-0 ml-1" @click.prevent="logout" v-if="isLogin">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    searchProduct () {
    },
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'LandingPage' })
      this.$store.commit('SET_LOGIN', false)
    }
  }
}
</script>

<style>
  .cms-logo {
    text-decoration: none;
    text-color: black;
  }
</style>
