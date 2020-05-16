<template>
  <v-app class='Login' style="display:flex; flex-direction:column; justify-content:center; text-align:center;">
    <div class = "form-style" style="height: inherit;">
      <div v-if="!isLoading">
        <h2>Login Form</h2>
      </div>
      <div v-if="message" style="font-size : 15px !important; color: red;">
        <div>
          {{message}}
        </div>
        <img v-if="notAdmin" src="https://lh3.googleusercontent.com/proxy/pmvq2tmb7pzjz05UdMzNwpZU6tb6G0QEcbNHTfqh0PaROu3cWLxEPye_EGWlEOL27byCo1NEE1SFmtNt_OWqkg0">
      </div>
      <div v-if="isLoading">
        <Loading></Loading>
      </div>
      <div style="padding-top:10px" v-if="!isLoading">
        <form id="loginForm" method="post" @submit.prevent="login">
          <b-input-group size="lg">
            <b-input-group-prepend is-text>
              <b-icon :icon="fillingEmail"></b-icon>
            </b-input-group-prepend>
            <b-form-input v-model="emailLogin"
                          v-if="emailLogin !== '' ? fillingEmail = 'envelope-fill' : fillingEmail = 'envelope'"
                          type="email"
                          placeholder="me@example.com"
                          @focus="message = ''">
            </b-form-input>
          </b-input-group>
          <b-input-group size="lg">
            <b-input-group-prepend is-text>
              <b-icon @click.prevent="showPassword" :icon="icon" style="cursor:pointer;"></b-icon>
            </b-input-group-prepend>
            <b-form-input v-model="passwordLogin"
                          :type="type"
                          placeholder="Your Password">
            </b-form-input>
          </b-input-group>
          <div style="display:flex; justify-content:space-around; align-items:center; padding-top:10px;" v-if="emailLogin !== '' && passwordLogin !== ''">
            <button type="submit" class="btn btn-primary" style="width:100%">Login</button>
          </div>
        </form>
      </div>
    </div>
  </v-app>
</template>

<script>
import Loading from './loading'
export default {
  name: 'adminLogin',
  components: {
    Loading
  },
  data () {
    return {
      emailLogin: '',
      passwordLogin: '',
      icon: 'eye',
      fillingEmail: 'envelope',
      type: 'password',
      disableLogin: true,
      message: '',
      notAdmin: true,
      isLoading: false
    }
  },
  methods: {
    showPassword () {
      this.type === 'password' ? this.type = 'text' : this.type = 'password'
      this.icon === 'eye' ? this.icon = 'eye-fill' : this.icon = 'eye'
    },
    login () {
      this.isLoading = true
      this.message = ''
      const payload = {
        email: this.emailLogin.toLowerCase(),
        password: this.passwordLogin
      }
      this.$store.dispatch('login', payload)
        .then(({ data }) => {
          if (data.Role.name === 'admin') {
            localStorage.setItem('token', data.acces_token)
            this.$store.commit('SET_TOKEN', data.acces_token)
            this.$store.commit('SET_LOGIN', true)
            this.$router.push('/sdaslj332432')
            this.email = ''
            this.password = ''
            this.notAdmin = false
          } else {
            this.message = 'You are not allowed to acces this site'
            this.notAdmin = true
          }
        })
        .catch(err => {
          this.notAdmin = false
          this.message = err.response.data.msg
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  created () {

  }
}
</script>

<style scoped>
  .form-style {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 15px;
    justify-content: center;
    align-items: center;
  }
  #loginForm {
    width: 100%;
  }
</style>
