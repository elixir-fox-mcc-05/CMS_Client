<template>
 <section>
        <b-field label="Email">
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
      // console.log('test')

      const data = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('login', data)
        .then(({ data }) => {
          console.log(data)
          if (data.roles === 'admin') {
            console.log('masuk')
            
            const token = data.token
            const accountname = `${data.first_name} ${data.last_name}`
            localStorage.setItem('token', token)
            localStorage.setItem('AccountName', accountname)
            // this.$store.state.loggedIn
            this.$store.commit('SET_LOGIN', true)
            // console.log('asdasd loggedIn', this.$store.state.loggedIn)
            
          } else {
            console.log('login must with admin account only')
            this.$buefy.snackbar.open({
                    duration: 5000,
                    message: 'login must with admin account only',
                    type: 'is-danger',
                    position: 'is-top',
                    queue: true
                   
                })
          }

          // this.$store.state.loggedIn = true
          // this.$router.push({ name: 'Menu' })
        })
        .finally(_ => {
          this.$router.push('/menu')
         })
        .catch(err => {
          console.log(err.response.data)
          this.$buefy.snackbar.open({
            duration: 5000,
            message: err.response.data.error,
            type: 'is-danger',
            position: 'is-top',
            queue: true

          })
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
