<template>
  <div class="container">
    <div class="sidenav">
      <div class="login-main-text">
        <h2>
          E-commerce<br />
          Administrator
        </h2>
        <p>Sign In to access admin dashboard.</p>
      </div>
    </div>
    <div class="main">
      <div class="col-md-6 col-sm-12">
        <div class="login-form">
          <form @submit.prevent="signIn">
            <div class="form-group">
              <label>Email</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="your@mail.here"
              />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="*********"
              />
            </div>
            <button type="submit" class="btn btn-black text-white">
              Sign In
            </button>
            |
            <button type="reset" class="btn btn-secondary">Reset</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLandingPage',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store
        .dispatch('signIn', payload)
        .then(({ data }) => {
          this.$store.commit('SET_SIGNED_IN', true)
          localStorage.setItem('access_token', data.access_token)
          this.$router.push('/dashboard')
        })
        .catch(({ err }) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scope>
body {
  font-family: 'Lato', sans-serif;
}

.main-head {
  height: 150px;
  background: #fff;
}

.sidenav {
  height: 100%;
  background-color: #000;
  overflow-x: hidden;
  padding-top: 20px;
}

.main {
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
}

@media screen and (max-width: 450px) {
  .login-form {
    margin-top: 10%;
  }

  .register-form {
    margin-top: 10%;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 40%;
  }

  .sidenav {
    width: 40%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .login-form {
    margin-top: 80%;
  }

  .register-form {
    margin-top: 20%;
  }
}

.login-main-text {
  margin-top: 20%;
  padding: 60px;
  color: #fff;
}

.login-main-text h2 {
  font-weight: 300;
}

.btn-black {
  background-color: #000 !important;
  color: #fff;
}
</style>
