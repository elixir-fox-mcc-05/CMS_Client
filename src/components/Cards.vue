<template>
<div class="card">
  <div class="tags">
    <p class="tag"><span class="glyphicon glyphicon-tag"></span> {{cards.genre}}</p>
  </div>
  <img class="card-img-top" :src="cards.image_url" alt="Card image cap">
  <div class="bodycard">
    <div class="card-body">
      <h5 class="card-title"><b>{{cards.name}}</b></h5>
      <div class="desc">
        {{cards.description}}
      </div>
      <div class="stock">
        <h6>Stock : {{cards.stock}}</h6>
      </div>
      <h5>IDR {{cards.price}}</h5>
      <div class="btn-detail">
        <form @submit.prevent="buy(cards.id)">
          <input type="number" name="qty" id="qty" placeholder="0" v-model="qty" :max="cards.stock">
          <button type="submit" class="btn btn-primary">Add to Cart</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Cards',
  props: ['cards'],
  data () {
    return {
      qty: 0
    }
  },
  methods: {
    buy (id) {
      if (localStorage.access_token) {
        const payload = {
          productId: id,
          quantity: this.qty
        }
        this.$store.dispatch('addToCart', payload)
        .then((data) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Added successfully'
          })
        })
      } else {
        this.$store.dispatch('openLogin')
      }
    }
  }
}
</script>

<style scoped>
.card {
  width: 300px;
  margin: 5px;
  height: 300px;
  border: none;
}

.card-img-top {
  width: 100%;
  height: inherit;
}

.desc {
  height: 40px;
}

.bodycard{
  position: absolute;
  display: flex;
  width: inherit;
  height: inherit;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.card-body{
  margin-top: 100px;
  color: aliceblue;
}

.tags {
  display: flex;
  justify-content: flex-end;
  width: inherit;
  position: absolute;
  color: rgb(255, 255, 255);
  z-index: 2;
}

.stock {
  height: 10px;
}

.btn-detail {
  margin-top: 10px;
}

#qty {
  border-radius: 5px;
  height: 33px;
  width: 33px;
  margin-right: 5px;
  margin-top: 3px;
  text-align: center;
  color: #000;
}
</style>
