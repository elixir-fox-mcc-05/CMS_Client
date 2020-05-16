<template>
  <div class="simple-login-container">
    <h2>Admin</h2>
    <form @submit.prevent="login">
        <div class="row">
            <div class="col-md-12 form-group">
                <input type="text" class="form-control" placeholder="Email" v-model="email">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 form-group">
                <input type="password" placeholder="Password" class="form-control" v-model="password">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 form-group">
                <input type="submit" class="btn btn-block btn-login" value="Login">
            </div>
        </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(data => {
          localStorage.setItem('access_token', data.data.access_token)
          this.$router.push({ name: 'HomePage' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
body{
    background-color:#fff;
    font-size:14px;
    color:#fff;
}
.simple-login-container{
    width:300px;
    max-width:100%;
    margin:50px auto;
}
.simple-login-container h2{
    text-align:center;
    font-size:20px;
}

.simple-login-container .btn-login{
    background-color:#5a5e5e;
    color:#fff;
}
a{
    color:#fff;
}
</style>
