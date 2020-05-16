<template>
  <div class="card">
    <div class="img-holder">
      <img class="img-product" :src="product.image_url" style="width:100%">
      <button v-if="isAdmin" class="btn-inc" @click="restock(product.id, 'up', product.stock)">+</button>
      <button v-if="isAdmin" class="btn-dec" @click="restock(product.id, 'down', product.stock)">-</button>
      <button v-if="isAdmin" class="btn-del" @click="destroy(product.id)">Delete</button>
    </div>
    <h1>{{product.name}}</h1>
    <p class="price">Rp. {{product.price}}</p>
    <p> Stock {{product.stock}} Items.</p>
    <p class="tags">{{product.tags}}</p>
    <router-link :to="`/productDetail/${product.id}`" v-if="isLogin">
    <button class="btn-detail" > Detail </button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Product',
  props: ['product'],
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    isAdmin () {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    restock (prodId, step, stock) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/product/${prodId}`,
        data: {
          step,
          stock
        },
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        this.$store.dispatch('fect')
      }).catch((err) => {
        console.log(err)
      })
    },
    destroy (prodId) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/product/${prodId}`,
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        this.$store.dispatch('fect')
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.tags {
  margin: 10px;
  float: right;
}
.card {
  box-shadow: 0px 14px 48px 10px rgba(0, 0, 0, 0.2);
  max-width: 200px;
  margin: auto;
  text-align: center;
  font-family: arial;
  margin-bottom: 70px;
}
.price {
  color: grey;
  font-size: 22px;
}

.price {
  color: grey;
  font-size: 22px;
}

.btn-detail {
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
.img-holder {position: relative;}
.btn-inc {
  position: absolute;
  font-weight: bold;
  bottom: 170px; /*your button position*/
  right: 10px; /*your button position*/
}
.btn-dec {
  position: absolute;
  font-weight: bold;
  bottom: 170px; /*your button position*/
  right: 40px; /*your button position*/
}
.btn-del {
  position: absolute;
  font-weight: bold;
  bottom: 170px; /*your button position*/
  right: 140px; /*your button position*/
}
</style>>
