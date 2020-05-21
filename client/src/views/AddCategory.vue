<template>
<section>

        <b-field label="Name">
            <b-input v-model="name" placeholder="No label" rounded></b-input>
        </b-field>

        <button @click.prevent="newCategory" class="button is-dark">
            <b-icon icon="check"></b-icon>
            <span>Finish</span>
        </button>

    </section>
</template>

<script>
import server from '../api'

export default {
  name: 'addCategory',
  methods: {
    newCategory () {
      const newData = {
        name: this.name
      }
      server.post('/category/add', newData, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$router.push('/category')
          this.$buefy.toast.open('Add Category Completed')
        })
        .catch(err => {
          console.log(err.response.data.error)
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
    if (!localStorage.token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
