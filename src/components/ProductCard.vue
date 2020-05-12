<template>
 <div class="card" style="width: 18rem;">
  <img class="card-img-top" :src="product.image_url" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">{{product.name}}</h5>
    <div class="desc">
     <p class="card-text">{{product.description}}</p>
    </div>
    <div class="stock">
     <h6>Stock : {{product.stock}}</h6>
    </div>
     <h5>IDR {{product.price}}</h5>
    <div class="btn-detail">
    <a href="#" class="btn btn-primary">Go somewhere</a>
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
.card{
 width: 300px;
 margin: 5px;
}

.card-img-top{
 height: 300px;
}

.desc{
 height: 60px;
}

.btn-detail{
 margin-top: 10px;
}
</style>
