<template>
  <div class="container">
    <div class="card" style="width: 18rem">
      <img :src=product.image_url class="card-img-top">
      <div class="card-body">
          <h5 class="card-title"> {{product.name}} </h5>
          <p class="card-text"> Rp {{product.price}},- </p>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <button class="btn btn-primary"><i class="fas fa-edit"></i></button>
              </div>
              <div class="col-sm">
                <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Products',
  props: ['product'],
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px 0px 2px 60px;
}

img {
  max-height: 220px;
}

</style>
