<template>
<div class="container-fluid">
  <div>
  <p>{{errorMsg}}</p>
  </div>
  <h5>Login</h5>
    <form action="" v-on:submit.prevent="login">
      <label for="">Email</label><br>
      <input type="email" placeholder="Email" id="email" v-model="email"><br>
      <label for="">Password</label><br>
      <input type="password" placeholder="Password" id="password" v-model="password"><br>
      <input type="submit" value="Login">
  </form>
</div>
</template>

<script>
import axios from 'axios'
const baseUrl = 'http://localhost:3000'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      token: localStorage.getItem('token'),
      errorMsg: ''
    }
  },
  methods: {
    login () {
      axios.post(`${baseUrl}/user/login`, {
        email: this.email,
        password: this.password
      })
        .then(response => {
          console.log(response)
          if (response) {
            localStorage.setItem('token', response.data.token)
            this.$store.commit('set_login', true)
            this.$store.commit('set_currentUser', this.email)
            this.$router.push('/MainPage')
          }
        })
        .catch(err => {
          setTimeout(() => {
            this.errorMsg = ''
          }, 4000)
          this.errorMsg = err.response.data.error
          console.log(this.errorMsg)
        })
    }
  }
}
</script>

<style>

</style>
