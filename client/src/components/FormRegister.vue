<template>
  <div>
      <form>
        <el-input type="email" placeholder="Your first name" v-model="first_name" clearable></el-input><br><br>
        <el-input type="email" placeholder="Your last name" v-model="last_name" clearable></el-input><br><br>
        <el-input type="email" placeholder="Your mail" v-model="email" clearable></el-input><br><br>
        <el-input placeholder="Your Password" v-model="password" show-password></el-input><br><br>
        <el-input placeholder="Your role" v-model="role" clearable></el-input><br><br>
        <el-button type="primary submit" @click.prevent="onSubmit">Submit</el-button>
        <el-button type="primary" @click="cancel">Cancel</el-button>
      </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: ''
    }
  },
  methods: {
    onSubmit () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          role: this.role
        }
      })
        .then(newUser => {
          console.log(newUser) // reset fields,
          this.$router.push({ path: '/login' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancel () { this.$router.push({ path: '/' }) }
  }
}
</script>

<style>
</style>
