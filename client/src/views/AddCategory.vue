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
          this.$router.push('/menu')
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
