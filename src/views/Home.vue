<template>
  <div>
    <div v-show="loginForm === true" class="container homepage">
      <img src="../assets/ecommerce.png" alt="">
      <div @submit.prevent="submitLogin" class="form-container">
        <h2 class="text-center mt-1">Login</h2>
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
            <div class="btn-login">
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
        </form>
      </div>
    </div>
    <div v-show="loginForm === false" class="container si-banner">
      <Banner></Banner>
    </div>
  </div>

</template>

<script>
import Banner from '../components/Banner'
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
  components: {
    Banner
  },
  computed: {
    loginForm () {
      return this.$store.state.loginForm
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
  @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
  .form-container {
    width: 450px;
    margin: auto;
    border: solid black 1px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .homepage {
    display: flex;
    margin-top: 100px;
    margin-bottom: 70px;
  }
  h2 {
    font-family: 'Oswald';
  }
  .btn-login {
    display: flex;
    justify-content: center;
  }
  .btn-login .btn {
    width: 200px;
  }
  .si-banner {
    margin-top: 120px;
  }
</style>
