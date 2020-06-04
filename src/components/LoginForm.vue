<template>
  <div style="display:flex;justify-content:center;">
      <form class="col-10 justify-content-center"  @submit.prevent="login()">
            <label class="control-label" for="loginEmail"><b>Email:</b></label>
            <input type="email" class="form-control" id="loginEmail" v-model="user.loginEmail">
            <label class="control-label" for="loginPassword"><b>Password:</b></label>
            <input type="password" class="form-control" id="loginPassword" v-model="user.loginPassword"><br>
            <button type="submit" class="btn btn-success" style="width:100%;"><b>Log in</b></button><br>
        </form><br>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginForm',
  methods: {
    login () {
      const signingUser = {
        email: this.user.loginEmail,
        password: this.user.loginPassword
      }
      axios({
        method: 'POST',
        url: 'https://peaceful-peak-29407.herokuapp.com/login',
        // url: 'http://localhost:3000/login',
        data: signingUser
      })
        .then(result => {
          localStorage.setItem('access_token', result.data.access_token)
          this.$store.commit('set_currentlyLoggedIn', false)
          this.$router.push('/dashboard')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  data () {
    return {
      user: {
        loginEmail: '',
        loginPassword: ''
      }
    }
  }
}
</script>

<style scoped>
label{
  color:#2c3e50;
}
</style>
