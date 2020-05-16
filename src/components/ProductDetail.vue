<template>
  <div id="productDetail">
    <div class="container">
      <h4 class="center">{{product.name}}</h4>
      <div class="center">
        <img :src="product.image_url">
      </div>
      <div>
        <h5>Description</h5>
        <p>{{ product.description }}</p>
        <h5>Category</h5>
        <p>{{ product.category}}</p>
        <h5>Price</h5>
        <p>{{ product.price }}</p>
        <h5>Stock</h5>
        <p v-if="product.stock == 0">Empty</p>
        <p v-else>{{ product.stock }}</p>
      </div>
      <div class="center">
        <div class="row">
          <div class="col m4">
            <router-link :to="'/product/show_all'"><button class="btn"><i class="material-icons left">arrow_back</i>Back</button></router-link>
          </div>
          <div class="col m4">
            <router-link :to="`/product/${product.id}/edit`"><button class="btn"><i class="material-icons left">edit</i>Edit Product</button></router-link>
          </div>
          <div class="col m4">
            <button class="btn" @click.prevent="deleteProduct"><i class="material-icons left">delete</i>Delete Product</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import server from '../api/index'
export default {
  name: 'ProductDetail',
  data () {
    return {
      product: ''
    }
  },
  methods: {
    getProductById () {
      server({
        method: 'get',
        url: `/product/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.product = response.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct () {
      server({
        method: 'delete',
        url: `/product/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
          this.$router.push({ name: 'ProductsTable' })
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    }
  },
  created () {
    this.getProductById()
  }
}
</script>

<style scoped>
  #productDetail {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  img {
    width: 300px
  }
</style>>
