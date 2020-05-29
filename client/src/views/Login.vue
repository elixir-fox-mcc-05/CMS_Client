<template>
  <div class="home">
    <form>
      <div class="container">
        <h2>{{loginMsg}}</h2>
        <h1>{{logReg}}</h1>
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required v-model="email">
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required v-model="password">
        <button v-if="logReg === 'login'" @click="login">Login</button>
        <button v-if="logReg === 'register'" @click="login">Register</button>
        <button type="button" class="cancelbtn" @click="cancle">Cancel</button>
        <p><a v-if="!reg" href @click.prevent="register">Dint Have Account ?</a></p>
        <p><a v-if="reg" href="">Have Account ?</a></p>
        <a></a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      reg: false,
      logReg: 'login',
      regLog: 'register',
      email: '',
      password: '',
      loginMsg: ''
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$router.push({ name: 'Dashboard' })
      this.$store.commit('SET_LOGIN', true)
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    cancle () {
      this.email = ''
      this.password = ''
    },
    login () {
      axios({
        method: 'POST',
        url: `https://hidden-beyond-51968.herokuapp.com/${this.logReg}`,
        data: {
          email: this.email,
          password: this.password
        }
      }).then((result) => {
        if (result.data.status === 'admin') {
          this.$store.commit('SET_ADMIN', true)
          localStorage.setItem('admin', true)
        }
        localStorage.setItem('access_token', result.data.access_token)
        this.$store.commit('SET_LOGIN', true)
        this.$router.push('Dashboard')
      }).catch((err) => {
        console.log(err)
        this.loginMsg = 'Wrong email / password'
      })
    },
    register () {
      this.reg = true
      this.email = ''
      this.password = ''
      this.logReg = 'register'
      this.regLog = 'login'
      this.logMsg = 'Already Have Account ?'
    }
  }
}
</script>

<style scoped>
/* Bordered form */
.home{
  padding: 5% 30%;
}
form {
  border: 3px solid #f1f1f1;
}

/* Full-width inputs */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 12px;
  border: none;
  cursor: pointer;
  width: 40%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: 40%;
  padding: 14px 20px;
  background-color: #f44336;
}

/* Add padding to containers */
.container {
  padding: 15px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>
