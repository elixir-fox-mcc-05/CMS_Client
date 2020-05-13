<template>
<div class="ProductCard">
  <img class="img-card" :src="product.image_url" alt="Card image cap">
  <div class="title">
  <div class="des">
  <h1>{{product.name}}</h1>
  <h4>{{product.description}}</h4>
  </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'ProductCard',
  props: ['product']
}
</script>

<style scoped>

.img-card{
  width: 100%;
  height:100%;
}

.title{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: -130px;
  margin-left: 10px;
  z-index: 2;
  position: absolute;
  color: wheat;
}
.des{
  text-align: left;
}

</style>
