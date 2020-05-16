<template>
  <div id="ProductCard" style="width:100%; background-color:#FFFAE7; margin:10px 0px 0px 0px; border-radius:10px; box-shadow: 5px 10px 8px #FFEDA8">
    <div class="container" style="display:flex; align-items:center; border-radius:10px;">
      <div class="row m-2" style="width:100%;">
        <div class="row" style="width:75%">
          <div style='margin:10px; height:80px; width:95px; background-color:white; border-radius:5px; display:flex;align-items:center;justify-content:center;'>
            <img :src="product.image_url" style="height:80%;">
          </div>
          <p class="taskContent" style="width:30%;"><b>{{product.name}}</b></p>
          <p class="taskContent">{{product.category}}</p>
          <p class="taskContent">{{product.stock}}</p>
          <p class="taskContent">{{product.price}}</p>
        </div>
        <div class="row" style="max-width:30%;display:flex;align-items:center">
            <router-link :to="{ name: 'editProduct', params: { id: product.id } }" style="margin:10px;">
              <button type="button" class="btn btn-warning" style="height:50px;">Edit product</button>
            </router-link>
            <button @click="deleteProduct(product.id)" type="button" class="btn btn-danger" style="margin:10px;height:50px;">Delete product</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  methods: {
    deleteProduct (id) {
      axios({
        method: 'DELETE',
        url: `https://peaceful-peak-29407.herokuapp.com/products/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          console.log(result)
          this.$store.dispatch('fetchAllProducts')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

.taskContent{
  width:115px;
  margin:5px;
  display:flex;
  align-items: center;
  text-align: left;
  /* font-size: small; */
}

</style>
