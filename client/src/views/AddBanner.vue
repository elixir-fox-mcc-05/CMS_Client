<template>
<section>

        <b-field label="Name">
            <b-input v-model="namebanner" placeholder="No label" rounded></b-input>
        </b-field>

        <b-field  label="Image URL">
          <b-upload v-model="image_url">
        <a class="button is-primary is-fullwidth">
          <b-icon icon="upload"></b-icon>
          <span>{{ image_url.name || "Click to upload"}}</span>
        </a>
      </b-upload>
        </b-field>

        <button @click.prevent="newBanner" class="button is-dark">
            <b-icon icon="check"></b-icon>
            <span>Finish</span>
        </button>

    </section>
</template>

<script>
import server from '../api'

export default {
  name: 'addBanner',
  data () {
    return {
      categories: ['asd', 'asdf'],
      category: [],
      image_url: ''
    }
  },
  methods: {
    newBanner () {
      let bodyForm = new FormData()
       bodyForm.append('image_url',this.image_url)
        bodyForm.append('name',this.namebanner)

      // const newData = {
      //   name: this.namebanner,
      //   image_url: this.image_url
      // }
      // console.log(newData)
      server.post('/banner/add', bodyForm, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchBanner')
          //   this.$store.commit('SET_ADDPRODUCT', data)

          console.log('add banner completed')
          this.$router.push('/bannerlist')
          this.$buefy.toast.open('Add Banner Completed')
        }).catch(err => {
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
    // if (!localStorage.token) {
    //   this.$router.push('/')
    // }
  }
}
</script>

<style>

</style>
