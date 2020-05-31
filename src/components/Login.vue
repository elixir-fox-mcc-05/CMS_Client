<template>
    <div class="image-bg">
        <div class="form-container">
            <div class="logo">
                <img src="../assets/gobers-logo.png" alt="gober's logo" class="img-logo">
            </div>
            <div class="login-form">
                <hr>
                <form @submit.prevent="login">
                    <h1>Login</h1>
                    <div class="form-input">
                        <label for="email">Email</label>
                        <input type="text" v-model="loginEmail" class="email" id="email" placeholder="your email here">
                    </div>
                    <div class="form-input">
                        <label for="password">Password</label>
                        <input type="password" v-model="loginPassword" class="password" id="password" placeholder="your password here">
                    </div>
                    <button type="submit" class="btn-login" v-if="!$store.state.isLoading">SUBMIT</button>
                </form>
                <div class="credit">
                    <Circle2 class=" text-center mt-2" v-if="$store.state.isLoading"></Circle2>
                    <h6>Photo by Lucas Andrade from Pexels</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Circle2 } from 'vue-loading-spinner'

export default {
  name: 'Login',
  components: {
    Circle2
  },
  data () {
    return {
      loginEmail: '',
      loginPassword: ''
    }
  },
  methods: {
    login () {
      this.$store.commit('set_loading_status', true)
      const loginData = {
        email: this.loginEmail,
        password: this.loginPassword
      }
      this.$store.dispatch('login', loginData)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$router.push({ name: 'dashboard' })
          this.loginEmail = ''
          this.loginPassword = ''
          this.$store.commit('set_login_status', true)
        })
        .catch(err => {
          this.$toasted.show(err.response.data.error)
        })
        .finally(() => {
          this.$store.commit('set_loading_status', false)
        })
    }
  }
}
</script>

<style scoped>

    .logo {
        width: 60%;
        text-align: center;
        background-color: rgba(53, 59, 59, 0.8);
        border-radius: 30px;
    }

    .img-logo {
        height: 170px;
    }

    h1 {
        text-align: center;
        font-size: 32px;
        margin: 18px;
    }

    h1, label {
        color: white;
    }

    .image-bg {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-image: url('../assets/helmet.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
        width: 100%;
    }

    .form-container {
        width: 30%;
        padding: 20px 15px;
        background-color: rgba(24, 19, 12, 0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }

    .form-input input {
        width: 100%;
        border: none;
        border-bottom: blanchedalmond solid 1px;
        background: transparent;
        outline: none;
        line-height: 1.5;
        color: white;
        outline: none;
        font-size: 18px;
        height: 45px;
        background-color: transparent;
    }

    .form-input label {
        width: 100%;
        text-align: left;
        font-family: monospace;
        font-weight: bold;
        font-size: 25px;
        float: left;
    }

    .form-input {
        margin: 18px 0;
    }

    .btn-login {
        background: none;
        text-align: center;
        margin-top: 10px;
        width: 100%;
        height: 40px;
        background-color: tomato;
        border: transparent;
        border-radius: 10px;
        color: white;
        font-size: 20px;
        font-family: 'Abril Fatface', cursive;
    }

    button:hover {
        cursor: pointer;
        background-color: rgb(167, 68, 51);
        color: wheat;
    }

    .credit {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: whitesmoke;
        position: relative;
        margin-top: 5px;
    }
</style>
