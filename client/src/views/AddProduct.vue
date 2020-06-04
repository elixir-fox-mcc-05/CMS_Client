<template>
<section>

        <b-field label="Name">
            <b-input v-model="nameproduct" placeholder="No label" rounded></b-input>
        </b-field>

        <b-field  label="Image URL">
          <b-upload v-model="image_url">
        <a class="button is-primary is-fullwidth">
          <b-icon icon="upload"></b-icon>
          <span>{{ image_url.name || "Click to upload"}}</span>
        </a>
      </b-upload>
        </b-field>

        <b-field label="Stock">
            <b-input v-model="stock" placeholder="No label" rounded></b-input>
        </b-field>

        <b-field label="Price">
            <b-input v-model="price" placeholder="No label" rounded></b-input>
        </b-field>

        <div class="columns is-mobile is-centered">
          <div class="column is-half">
          <b-field label="Category">
            <b-select v-model="category" placeholder="Select a subject" expanded rounded>
                <option v-for="(category,i ) in categories" :key="i" v-bind:value="category.id">{{category.name}}</option>
            </b-select>
        </b-field>
        </div>
        </div>
        <button @click.prevent="newProduct" class="button is-dark">
            <b-icon icon="check"></b-icon>
            <span>Add Product</span>
        </button>

    </section>
</template>

<script>
import server from '../api'

export default {
  name: 'addProduct',
  data () {
    return {
      categories: ['asd', 'asdf'],
      category: [],
      image_url: ''
    }
  },
  methods: {
    newProduct () {
      let bodyForm = new FormData()
       bodyForm.append('image_url',this.image_url)
        bodyForm.append('name',this.nameproduct)
         bodyForm.append('stock',this.stock)
          bodyForm.append('price',this.price)
      bodyForm.append('CategoryId',this.category)

      // const newData = {
      //   name: this.nameproduct,
      //   image_url: bodyForm,
      //   stock: this.stock,
      //   price: this.price,
      //   CategoryId: this.category
      // }

      // console.log(newData)
      server.post('/products/add', bodyForm, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchProducts')
          this.$store.commit('SET_ADDPRODUCT', data)

          console.log('add product completed')
          this.$router.push('/menu')
          this.$buefy.toast.open('Add Product Completed')
        })
        .catch(err => {
          console.log(err.response.data.error)
          // this.$buefy.snackbar.open(err.response.data.error[0])
          if (Array.isArray(err.response.data.error)) {
            this.$buefy.snackbar.open({
              duration: 5000,
              message: err.response.data.error[0],
              type: 'is-danger',
              position: 'is-top',
              queue: true

            })
          } else {
            this.$buefy.snackbar.open({
              duration: 5000,
              message: err.response.data.error,
              type: 'is-danger',
              position: 'is-top',
              queue: true

            })
          }
        })
    },
    categoryList () {
      this.categories = this.$store.state.categories
      console.log('asdasf', this.categories)
    }

  },
  computed: {

  },
  created () {
    // if (!localStorage.token) {
    //   this.$router.push('/')
    // }
    this.$store.dispatch('fetchCategory')
      .finally(_ => {
        // console.log('bobo'+this.$store.state.categories)
        this.categoryList()
      })

    // console.log(test[0][0])
  }
}
</script>

<style>

</style>
