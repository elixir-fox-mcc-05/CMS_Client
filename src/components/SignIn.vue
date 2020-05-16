<template>
  <div class="login_part_form_iner">
      <h3>Log in now</h3>
      <form class="row contact_form" @submit.prevent="login">
          <div class="col-md-8 form-group p_star">
              <input type="text" class="form-control" id="email" name="email" v-model="email"
                  placeholder="admin1@mail.com">
          </div>
          <div class="col-md-8 form-group p_star">
              <input type="password" class="form-control" id="password" name="password" v-model="password"
                  placeholder="******">
          </div>
          <div class="col-md-12 form-group">
              <button type="submit" value="submit" class="btn_1">
                  log in
              </button>
          </div>
      </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios({
        method: 'POST',
        url: 'https://pacific-scrubland-26922.herokuapp.com/users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.access_token)
          this.$router.push('main')
        })
        .catch(err => {
          console.log(err.response.data.errors[0].message)
        })
    }
  }
}
</script>

<style scoped>

.btn_1 {
  display: inline-block;
  padding: 9px 42px;
  border-radius: 50px;
  background-color: #2f7dfc;
  border: 1px solid #f4f4f4;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  font-weight: 400;
  border: 1px solid #2f7dfc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.btn_1:hover {
  background-color: red;
  color: #fff;
}

</style>
