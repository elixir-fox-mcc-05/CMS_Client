<template>
  <div>
    <div class="container" id="container">
      <div class="form-container sign-in-container">
        <form v-on:submit.prevent="signIn()">
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" v-model="email">
          <input type="password" placeholder="Password" v-model="password">
          <a href="#">Forgot your password?</a>
          <button v-on:click.prevent="signIn()">Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <h2 style="color: red;">{{errorMsg}}</h2>
            <p>Enter your personal details and start journey with us</p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalSignup" data-whatever="newtask" data-dismiss="modal" aria-label="close">Sign up</button>
          </div>
        </div>
      </div>
      <div class="modal fade" id="ModalSignup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                  <div class="modal-header">
                      <h1 class="modal-title" id="exampleModalLabel">Enter your personal details and start journey with us</h1>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      <form v-on:submit.prevent="register()">
                        <h2>Choose your genre !</h2>
                        <label >Your room email:</label>
                        <input id="emailRegist" type="email" placeholder="email" v-model="emailRegist"><br>
                        <label for="">Password :</label><br>
                        <input type="password" id="passwordRegist" v-model="passwordRegist">
                      </form>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="register()">Sign up</button>
                  </div>
                  </div>
              </div>
          </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const baseUrl = 'http://localhost:3000'

export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      emailRegist: '',
      passwordRegist: '',
      token: localStorage.getItem('token'),
      errorMsg: ''
    }
  },
  methods: {
    signIn () {
      axios.post(`${baseUrl}/users/`, {
        email: this.email,
        password: this.password
      })
        .then(response => {
          console.log(response)
          if (response) {
            localStorage.setItem('token', response.data.token)
            this.$store.commit('set_token', this.token)
            this.$store.commit('set_currentUserName', this.email)
            this.$router.push('/mainPage')
          }
        })
        .catch(err => {
          setTimeout(() => {
            this.errorMsg = ''
          }, 4000)
          this.errorMsg = err.response.data.error
          console.log(this.errorMsg)
        })
    },
    register () {
      axios.post(`${baseUrl}/users/register`, {
        email: this.emailRegist,
        password: this.passwordRegist
      })
        .then(response => {
          console.log(response)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
