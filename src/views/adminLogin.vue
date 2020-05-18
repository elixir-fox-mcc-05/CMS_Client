<template>
  <v-app class='black' style="color:white">
    <div class = "form-style" style="height: inherit;">
      <v-card align="center" class="black">
        <div v-if="message" style="font-size : 15px !important; color: red;">
          <div>
            {{message}}
          </div>
          <v-img v-if="notAdmin"
                src="https://cdn.drlinkcheck.com/blog/403-forbidden.png"
                height="auto"
          ></v-img>
        </div>
      </v-card>
      <div v-if="isLoading">
        <Loading></Loading>
      </div>
      <v-container v-if="!isLoading"
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="indigo"
                dark
                flat
              >
                <v-toolbar-title>Admin Page</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @keyup.native.enter.prevent="login">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    @focus="message = ''"
                    label="E-mail"
                    name="Email"
                    prepend-icon="email"
                    type="text"
                    v-model="emailLogin"
                  ></v-text-field>
                  </template>
                  <span>Fill the field to show login button</span>
                </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on="on"
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      :type="type"
                      v-model="passwordLogin"
                    ><v-icon slot="append" @click.prevent="showPassword">mdi-eye</v-icon>
                    </v-text-field>
                    </template>
                    <span>Click on eye to show password</span>
                  </v-tooltip>
                </v-form>
              </v-card-text>
              <v-card-actions v-if="emailLogin !== '' && passwordLogin !== ''">
                <v-spacer></v-spacer>
                <v-btn @click.prevent="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
            this.$router.push('/admin')
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
