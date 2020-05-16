<template>
  <div id="LandingPage" style="margin:10px;">
      <div class="container">
        <div class="row">
            <div class="col-6 mx-auto p-4 justify-content-center" style="background-color:rgb(255, 228, 124); color:white; border-radius:8px;">
                <img src="..\assets\img\hop&lop_logo_1.png" style="max-width:50%;">
                <hr/>
                <LoginForm />
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'

export default {
  name: 'LandingPage',
  components: {
    LoginForm
  },
  created () {
    if (localStorage.access_token) {
      this.$router.push('/dashboard')// Jika ada access_token, paksa masuk ke dashboard
      this.$store.commit('set_currentlyLoggedIn', true)
    } else {
      this.$store.commit('set_currentlyLoggedIn', false)
    }
  }
}
</script>

<style>

</style>
