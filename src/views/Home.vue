<template>
  <div @submit.prevent="submitLogin" class="form-container">
    <h2 class="text-center mt-4">Login</h2>
    <form action="" class="mt-4">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" name="email" placeholder="Your Email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="Your Password" class="form-control" v-model="password">
            <div v-html="feedback"></div>
        </div>
        <br>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      email: '',
      password: '',
      feedback: ''
    }
  },
  methods: {
    submitLogin () {
      axios.post('http://localhost:3000/users/login', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          const { data } = response
          const token = data.Token
          localStorage.setItem('token', token)
          this.$store.commit('changeLoginStatus', true)
          this.$router.push('/dashboard')
        })
        .catch(err => {
          err = err.response
          const { data } = err
          const error = data.message
          this.feedback = `<p>${error}</p>`
        })
    }
  }
}
</script>

<style>
  .form-container {
    width: 500px;
    margin: auto;
  }
</style>
