<template>
  <div class="d-flex login-register align-items-center justify-content-center">
    <div class="border border-primary p-5 rounded">
      <h3 class="text-center">Register</h3>
      <div class="text-danger" id="errorMessage" v-if="errMessage">
        <span>{{ errMessage }}</span>
      </div>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="passwordLogin">Password</label>
          <div class="input-group">
            <input
              :type="type"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
            />
            <div class="input-group-append">
              <span class="input-group-text" id="showPassword"><a href="" @click.prevent="showPassword"><i :class="icon"></i></a></span>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
      <p class="mt-2">
        Already have an account?
        <a href="" @click.prevent="showLogin">Login</a>
      </p>
    </div>
  </div>
</template>

<script>
import server from '../api'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      icon: 'fa fa-eye-slash',
      type: 'password'
    }
  },
  methods: {
    showLogin () {
      this.$store.commit('TOGGLE_LOGIN', true)
    },
    showPassword () {
      if (this.type === 'password') {
        this.type = 'text'
        this.icon = 'fa fa-eye'
      } else {
        this.type = 'password'
        this.icon = 'fa fa-eye-slash'
      }
    },
    register () {
      server.post('/register', {
        email: this.email,
        password: this.password
      })
        .then(results => {
          this.$store.commit('TOGGLE_LOGIN', true)
          this.$store.commit('SET_SUCCESS', 'Register Success, you can login now')
          setTimeout(() => {
            this.$store.commit('SET_SUCCESS', '')
          }, 2000)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  computed: {
    errMessage () {
      return this.$store.state.errMessage
    }
  }
}
</script>

<style>

</style>
