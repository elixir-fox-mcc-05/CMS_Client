<template>
  <div class="login-register d-flex align-items-center justify-content-center">
    <div class="border border-primary p-5 rounded administration">
      <h2 class="text-center">Login</h2>
      <div class="text-danger" id="errorMessage" v-if="errorMessage">
        <span>{{ errorMessage }}</span>
      </div>
      <div class="text-success" id="successMessage" v-if="successMessage">
        <p style="color: green;">{{ successMessage }}</p>
      </div>
      <form @submit.prevent="login">
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
          <label for="password">Password</label>
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
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      <p class="mt-2">
        Dont have an account?
        <a href @click.prevent="showRegister">Register</a>
      </p>
    </div>
  </div>
</template>

<script>
import server from '../api'

export default {
  data () {
    return {
      email: '',
      password: '',
      icon: 'fa fa-eye-slash',
      type: 'password'
    }
  },
  methods: {
    showPassword () {
      if (this.type === 'password') {
        this.type = 'text'
        this.icon = 'fa fa-eye'
      } else {
        this.type = 'password'
        this.icon = 'fa fa-eye-slash'
      }
    },
    login () {
      server.post('/login', {
        email: this.email,
        password: this.password
      })
        .then(results => {
          localStorage.setItem('token', results.data.token)
          localStorage.setItem('userRole', results.data.role)
          this.$store.commit('SET_ROLE', results.data.role)
          this.$store.commit('SET_LOGIN', true)
          this.$router.push({ name: 'Dashboard' })
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    showRegister () {
      this.$store.commit('TOGGLE_LOGIN', false)
    }
  },
  computed: {
    errorMessage () {
      return this.$store.state.errorMessage
    },
    successMessage () {
      return this.$store.state.successMessage
    }
  }
}
</script>

<style>
  .login-register {
    height: 100vh;
  }
  .input-group-text a {
    color: black;
    text-decoration: none;
  }
</style>
