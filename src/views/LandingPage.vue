<template>
  <div>
    <section id="loginForm">
      <div class="container">
        <div class="col s12 m4">
          <h4 class="center blue-text text-darken-2">Login</h4>
          <div class="input-field">
            <input id="email" v-model="user.email" type="email" class="validate" required>
            <label for="email">Email</label>
          </div>
          <div class="input-field">
            <input id="password" v-model="user.password" type="password" class="validate" required>
            <label for="password">Password</label>
          </div>
          <button type="submit" class="btn blue darken-3" @click.prevent="loginUser">Login</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import server from '../api/index'
export default {
  name: 'LandingPage',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser () {
      server({
        method: 'post',
        url: '/user/login',
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
        .then(response => {
          console.log(response.data)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('currentUserId', response.data.data.id)
          localStorage.setItem('currentUserName', response.data.data.name)
          this.$router.push({ name: 'Dashboard' })
          this.user.email = ''
          this.user.password = ''
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    if (localStorage.token) {
      this.$router.push({ name: 'Dashboard' })
      this.$store.dispatch('fetchProductsList')
    }
  }
}
</script>

<style>

</style>
