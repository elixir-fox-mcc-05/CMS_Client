<template>
  <div class="container">
      <div class="row">
          <div class="col-lg-9 col-lg-7 col-lg-5 mx-auto text-center">
          <br />
          <h2>Product Mangagement</h2>
          <h2>System</h2>
          <div class="card card-signin my-5">
              <div class="card-body">
              <h5 class="card-title text-center font-weight-bold h3">LOGIN</h5>
              <hr class="my-2">
              <h6 class="text-center text-danger" v-if="errorMessage">{{ errorMessage }} </h6>
              <form class="form-signin" @submit.prevent="login">
                  <div class="form-label-group">
                      <label for="inputEmail">Email address</label>
                      <input type="email" v-model="loginEmail" class="form-control" placeholder="Email address" required autofocus>
                  </div><br>
                  <div class="form-label-group">
                      <label for="inputPassword">Password</label>
                      <input type="password" v-model="loginPassword" class="form-control" placeholder="Password" required>
                  </div><br>
                  <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</button>
              </form>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      loginEmail: '',
      loginPassword: '',
      errorMessage: false,
      payload: {}
    }
  },
  methods: {
    login () {
      this.payload = {
        email: this.loginEmail,
        password: this.loginPassword
      }
      this.$store.dispatch('login', this.payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.$router.push('mainPage')
          this.errorMessage = false
        })
        .catch(err => {
          this.errorMessage = err.response.data.errors[0].message
        })
    }
  }
}
</script>

<style >
</style>
