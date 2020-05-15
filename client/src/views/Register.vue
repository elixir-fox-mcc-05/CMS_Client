<template>
    <section>
        <b-field label="First Name">
            <b-input v-model="first_name"></b-input>
        </b-field>

        <b-field label="Last Name">
            <b-input v-model="last_name"></b-input>
        </b-field>

        <b-field label="Email"
            type="is-danger"
            message="This email is invalid">
            <b-input v-model="email"
                type="email"
                value="john@"
                maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Password">
            <b-input v-model="password" type="password"
                password-reveal>
            </b-input>
        </b-field>

        <button @click.prevent="register" class="button is-dark">
            <b-icon icon="check"></b-icon>
            <span>Finish</span>
        </button>
        </section>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const newUser = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('register', newUser)
        .then(({ data }) => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  created () {
    if (localStorage.token) {
      this.$router.push('/menu')
    }
  }
}
</script>

<style>
</style>
