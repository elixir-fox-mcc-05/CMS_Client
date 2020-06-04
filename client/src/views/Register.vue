<template>
    <section>
        <b-field label="First Name">
            <b-input v-model="first_name" type="text"></b-input>
        </b-field>

        <b-field label="Last Name">
            <b-input v-model="last_name" type="text"></b-input>
        </b-field>

        <b-field label="Email">
            <b-input v-model="email"
                type="email"
                value="john@">
            </b-input>
        </b-field>

        <b-field label="Password">
            <b-input v-model="password" type="password"
                password-reveal>
            </b-input>
        </b-field>

        <b-field label="Secret Password is bolulu">
            <b-input v-model="secretpassword" type="password" placeholder="secretpassword is bolulu"
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
      if (this.secretpassword === 'bolulu') {
        const newUser = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          roles: 'admin'
        }

        this.$store.dispatch('register', newUser)
          .then(({ data }) => {
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err.response.data)
          })
      } else {
        console.log('gak bisa register admin yah??')
        this.$buefy.snackbar.open({
          duration: 5000,
          message: 'Register must with correct secret password',
          type: 'is-danger',
          position: 'is-top',
          queue: true

        })
      }
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
