<template>
  <v-app class="register" style="justify-content:center;">
    <div class = "form-style" style="font-size : 22px;">
      <div style="padding-bottom:15px;" v-if="!isLoading">
          Register Form
          <p style="font-size:15px;">!click on icon to show password</p>
      </div>
      <div v-if="message" style="font-size : 15px !important; color: red;">
          {{message}}
      </div>
      <div v-if="messageSucces" style="font-size : 15px !important; color: red;">
          {{messageSucces}}
      </div>
      <div v-if="isLoading">
        <Loading></Loading>
      </div>
      <div style="font-size : 20px !important;" v-if="!isLoading">
        <form style="display:flex; flex-direction:column; justify-content:space-between; max-width:850px;margin:auto;">
            <div style="display:flex; flex-direction:row">
              <b-input-group size="lg">
                <b-input-group-prepend is-text>
                  <b-icon :icon="fillingname"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-if="name !== '' ? fillingname = 'person-fill' : fillingname = 'person'"
                              v-model="name" type="text"
                              placeholder="Your Full Name">
                </b-form-input>
              </b-input-group>
              <b-input-group size="lg">
                <b-input-group-prepend is-text>
                  <b-icon @click.prevent="showPassword"
                          :icon="icon"
                          style="cursor:pointer;">
                  </b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="password"
                              @focus="requiredPassword = ''"
                              @blur="checkPassword"
                              :type="type"
                              placeholder="Your Password">
                </b-form-input>
              </b-input-group>
            </div>
            <div v-if="requiredPassword !== ''">
              {{requiredPassword}}
            </div>
            <div style="display:flex; flex-direction:row">
              <div>
                <b-form-group>
                  <b-input-group size="lg">
                    <b-input-group-prepend is-text>
                      <b-icon @click.prevent="showPassword"
                              :icon="icon"
                              size="h5 mb-2"
                              style="cursor:pointer;">
                      </b-icon>
                    </b-input-group-prepend>
                    <b-form-input v-model="confirmPassword"
                                  @focus="requiredConfirm = ''"
                                  @blur="checkConfirm"
                                  :type="type"
                                  placeholder="Confirm Password">
                    </b-form-input>
                  </b-input-group>
                  <div v-if="requiredConfirm !== ''">
                    {{requiredConfirm}}
                  </div>
                </b-form-group>
              </div>
              <div>
                <b-input-group size="lg">
                  <b-input-group-prepend is-text>
                    <b-icon :icon="fillingEmail"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input v-model="email"
                                v-if="email !== '' ? fillingEmail = 'envelope-fill' : fillingEmail = 'envelope'"
                                @focus="requiredEmail = ''"
                                @blur="checkEmail"
                                type="email"
                                placeholder="me@example.com">
                  </b-form-input>
                </b-input-group>
                <div v-if="requiredEmail !== ''">
                    {{requiredEmail}}
                </div>
              </div>
            </div>
            <div v-if="email && password && confirmPassword && name">
                <button @click.prevent ="registerUser" class="btn btn-primary btn-xs btn-block">Register</button>
            </div>
        </form>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'
import Loading from './loading'

export default {
  name: 'register',
  components: {
    Loading
  },
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      type: 'password',
      icon: 'eye',
      fillingname: 'person',
      fillingEmail: 'envelope',
      requiredEmail: '',
      baseUrl: 'http://localhost:3000/',
      message: '',
      messageSucces: '',
      requiredPassword: '',
      requiredConfirm: ''
    }
  },
  methods: {
    showPassword () {
      this.type === 'password' ? this.type = 'text' : this.type = 'password'
      this.icon === 'eye' ? this.icon = 'eye-fill' : this.icon = 'eye'
    },
    checkEmail () {
      const re = /\S+@\S+\.\S+/
      if (this.email !== '' && !re.test(this.email)) {
        this.requiredEmail = 'Please input real email with domain .com'
      }
    },
    checkPassword () {
      const re = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d#$@!%&*?]{8,50}$/
      if (this.password !== '' && !re.test(this.password)) {
        this.requiredPassword = 'Password must be 8 at length and contain at least 1 lower case, 1 upper case and 1 number'
      }
    },
    checkConfirm () {
      if (this.confirmPassword !== '' && this.confirmPassword !== this.password) {
        this.requiredConfirm = 'Password doesnt Match'
      }
    },
    registerUser () {
      this.isLoading = true
      axios({
        url: this.baseUrl + 'user/register',
        method: 'POST',
        data: {
          name: this.name,
          email: this.email.toLowerCase(),
          password: this.password,
          confirmPassword: this.confirmPassword
        }
      })
        .then(({ data }) => {
          this.messageSucces = 'Succes create new data with email :' + data.email
          return axios({
            method: 'POST',
            url: this.baseUrl + 'user/login',
            data: {
              email: this.email.toLowerCase(),
              password: this.password
            }
          })
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.acces_token)
          this.$store.commit('SET_LOGIN', true)
        })
        .catch(err => {
          console.log(err.response)
          this.message = err.response.data.msg
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    created () {
      if (localStorage.getItem('token')) {
        this.$store.commit('SET_LOGIN', true)
      }
    }
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
  #regisForm {
    width: 100%;
  }
</style>
