<template>
    <div class="login">
        <div class="container-fluid">
            <div class="col-5 mx-auto my-5">
                <h1>Login</h1>
                <form @click.prevent="loginUser">
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input  type="email" class="form-control" id="emailLogin" placeholder="Enter your email" v-model="emailLogin">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="passwordLogin" placeholder="Enter your password" v-model="passwordLogin">
                    </div>
                    <button class="btn btn-primary" type="submit" value="Login">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      emailLogin: '',
      passwordLogin: ''
    }
  },
  methods: {
    login () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      })
        .then(result => {
          localStorage.setItem('token', result.data.token)
          this.$router.push('Home')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
