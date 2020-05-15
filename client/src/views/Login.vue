<template>
 <section>
        <b-field label="Email"
            type="is-danger"
            message="This email is invalid">
            <b-input v-model="email" type="email">
            </b-input>
        </b-field>

        <b-field label="Password">
            <b-input v-model="password" type="password"
                value="iwantmytreasure"
                password-reveal>
            </b-input>
        </b-field>

        <button @click.prevent="login" class="button is-dark">
            <b-icon icon="check"></b-icon>
            <span>Finish</span>
        </button>
    </section>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log('test')

      const data = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('login', data)
        .then(({ data }) => {
          console.log('masuk')
          this.$router.push('/menu')
          const token = data.token
          localStorage.setItem('token', token)
          this.$store.commit(this.SET_LOGIN, true)
          // this.$store.state.loggedIn = true
          this.$router.push({ name: 'Menu' })
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style>

</style>
