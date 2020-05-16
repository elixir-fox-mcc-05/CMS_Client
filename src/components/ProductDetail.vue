<template>
  <div>
  <div class="container center" id="productDetail">
    <h4>{{product.name}}</h4>
    <router-view/>
    <div class="row">
      <div class="col m12 s12 center">
        <img :src="product.image_url" alt="">
        <h5>Description</h5>
          <p>{{ product.description }}</p>
        <h5>Category</h5>
          <p>{{ product.category}}</p>
        <h5>Price</h5>
          <p>{{ product.price }}</p>
        <h5>Stock</h5>
          <p v-if="product.stock == 0">Empty</p>
          <p v-else>{{ product.stock }}</p>
        <div>
          <a href=""><i class="material-icons">arrow_back</i></a> |
          <router-link :to="`/product/${product.id}/edit`"><i class="material-icons">edit</i></router-link> |
          <a @click.prevent="deleteProduct"><i class="material-icons">delete</i></a>
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
          console.log(response.data.notif)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getProductById()
  }
}
</script>

<style scoped>
  img {
    width: 300px
  }
  #productDetail {
    margin: 0px 20px;
  }
</style>>
