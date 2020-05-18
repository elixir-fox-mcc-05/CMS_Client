<template>
<section>

        <b-field label="Name">
            <b-input v-model="nameproduct" placeholder="No label" rounded></b-input>
        </b-field>

        <b-field label="iImage URL">
            <b-input v-model="image_url" placeholder="No label" rounded></b-input>
        </b-field>

        <b-field label="Stock">
            <b-input v-model="stock" placeholder="No label" rounded></b-input>
        </b-field>

        <b-field label="Price">
            <b-input v-model="price" placeholder="No label" rounded></b-input>
        </b-field>

        <b-field label="Subject">
            <b-select v-model="category" placeholder="Select a subject">
                <option v-for="(category,i ) in categories" :key="i" v-bind:value="category.id">{{category.name}}</option>
            </b-select>
        </b-field>

        <button @click.prevent="newProduct" class="button is-dark">
            <b-icon icon="check"></b-icon>
            <span>Finish</span>
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
      category: []
    }
  },
  methods: {
    newProduct () {
      const newData = {
        name: this.nameproduct,
        image_url: this.image_url,
        stock: this.stock,
        price: this.price,
        CategoryId: this.category
      }
      console.log(newData)
      server.post('/products/add', newData, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchProducts')
          this.$store.commit('SET_ADDPRODUCT', data)

          console.log('add product completed')
          this.$router.push('/menu')
        }).catch(err => {
          console.log(err.response.data)
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
    if (!localStorage.token) {
      this.$router.push('/')
    }
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
