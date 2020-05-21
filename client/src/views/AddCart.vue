<template>
<section>

        <div class="columns is-mobile is-centered">
          <div class="column is-half">
          <b-field label="UserId">
            <b-input v-model="UserIdCart" placeholder="No label" rounded></b-input>
        </b-field>

            <b-field label="ProductId" >
            <b-select v-model="ProductIdCart" placeholder="Select a subject" expanded rounded>
                <option v-for="(product,i ) in products" :key="i" v-bind:value="product.id">{{product.name}}</option>
            </b-select>
        </b-field>

        <b-field label="Stock">
            <b-numberinput  v-model="stock"  placeholder="number of quantity" rounded></b-numberinput>
        </b-field>
          </div>
        </div>

        <button @click.prevent="newCart" class="button is-dark">
            <b-icon icon="cart"></b-icon>
            <span>Add New Cart</span>
        </button>

    </section>
</template>

<script>
import server from '../api'

export default {
  name: 'AddCart',
  data () {
    return {
      categories: ['asd', 'asdf'],
      category: []
    }
  },
  methods: {
    newCart () {
      const newData = {
        UserId: this.UserIdCart,
        ProductId: this.ProductIdCart,
        quantity: this.stock

      }
      console.log(newData)
      server.post('/cart/add', newData, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchCart')
          this.$store.commit('SET_ADDCART', data)

          console.log('add product completed')
          this.$router.push('/cartlist')
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
    products () {
      return this.$store.getters.products
    }
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
