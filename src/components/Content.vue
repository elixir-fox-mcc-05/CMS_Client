<template>
<div class="content">
  <div class="d-flex justify-content-center flex-wrap">
    <carousel :per-page="1" :navigate-to="Slide" autoplay paginationActiveColor="orangered" :autoplay-timeout="5000" :loop="true" style="width: 100%; height: 100%;">
    <Slide v-for="product in products" :key="product.name">
    <ProductCard :product="product" />
    </Slide>
  </carousel>
  </div><br><br>
  <div class="cards d-flex justify-content-center flex-wrap">
  <Cards v-for="product in productCards" :key="product.name" :cards="product" />
  </div><br><br>
</div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import Cards from '@/components/Cards.vue'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Content',
  components: {
    ProductCard,
    Carousel,
    Slide,
    Cards
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    productCards () {
      return this.$store.state.productCards
    }
  },
  created () {
    this.$store.dispatch('getProducts')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.content{
  width: 100%;
  height: 100%;
  margin-top: -50px;
}
</style>
