<template>
  <div class="card">
    <img class="img-product" :src="products.image_url" style="width:100%">
    <h1>{{products.name}}</h1>
    <p class="price">Rp. {{products.price}}</p>
    <div class="stock">
      <button v-if="isAdmin" class="btn-quan" @click="restock(products.id, 'down', products.stock)">-</button>
      Stock {{products.stock}} Items.
      <button v-if="isAdmin" class="btn-quan" @click="restock(products.id, 'up', products.stock)">+</button>
    </div>
    <input class="quantity" type="number" v-model="demand">
    <p class="tags">{{products.tags}}</p>
    <p><button class="add" @click="addCart">Add to Cart</button></p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProductDetail',
  data () {
    return {
      products: [],
      demand: 0
    }
  },
  methods: {
    getData () {
      axios({
        method: 'GET',
        url: `https://hidden-beyond-51968.herokuapp.com/product/detail/${this.$route.params.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        this.products = result.data
      }).catch((err) => {
        console.log(err)
      })
    },
    addCart (demand) {
      axios({
        method: 'POST',
        url: `https://hidden-beyond-51968.herokuapp.com/product/cart/${this.$route.params.id}`,
        data: {
          demand: this.demand
        },
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        this.$router.push({ name: 'MyCart' })
      }).catch((err) => {
        console.log(err)
      })
    },
    restock (prodId, step, stock) {
      axios({
        method: 'PUT',
        url: `https://hidden-beyond-51968.herokuapp.com/product/${prodId}`,
        data: {
          step,
          stock
        },
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        // this.$router.push({ name: 'Dashboard' })
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    isAdmin () {
      return this.$store.state.isAdmin
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
  .stock {
    padding: 15px;
  }
  .tags {
  margin: 10px;
  float: right;
  }
  .card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 200px;
  margin: auto;
  text-align: center;
  font-family: arial;
  }

  .price {
  color: grey;
  font-size: 22px;
  }

  .price {
  color: grey;
  font-size: 22px;
  }

  .add {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  }

  .card button:hover {
    opacity: 0.7;
  }
  .img-product {
    height: 200px;
  }
</style>>
