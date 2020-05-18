<template>
<div class="card">
  <div class="deletebtn">
    <a href="#" style="font-size:24px" class="usericon" @click.prevent="deletebtn(item.id)"><i class="material-icons" id="user-btn">delete</i></a>
  </div>
  <div class="tags">
    <p><span class="glyphicon glyphicon-tag"></span> {{item.Product.genre}}</p>
  </div>
  <img class="card-img-top" :src="item.Product.image_url" alt="Card image cap">
  <div class="card-body">
    <div class="bodycard">
      <h5 class="card-title"><b>{{item.Product.name}}</b></h5>
      <div class="desc">
        <p>{{item.Product.description}}</p>
      </div>
      <p>Quantity: {{item.quantity}}</p>
      <h5>Total : IDR {{item.Product.price*item.quantity}}</h5>
      <div class="btn-detail d-flex row justify-content-center">
        <form>
          <input type="number" name="qty" id="qty" placeholder="0" v-model="qty" :min="0" :max="item.Product.stock-item.quantity">
          <button type="submit" class="btn btn-primary" id="submitbtn" @click.prevent="addMore(item.id)"><b>+</b></button>
        </form>
        <button class="btn btn-light" id="checkoutbtn" @click.prevent="checkout(item.id)">Checkout</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import socket from '../config/socket'
export default {
  name: 'Itemcarts',
  props: ['item'],
  data () {
    return {
      qty: 0
    }
  },
  methods: {
    checkout (id) {
      this.$store.dispatch('checkOut', id)
      .then(result =>{
        this.$store.dispatch('getCarts')
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
            title: 'Checked out successfully'
          })
          socket.emit('transaction')
          socket.on('finish-transaction', (data) => {
            this.$store.dispatch('refreshProducts', data)
          })
      })
    },
    addMore (id) {
      const payload = {
        id: id,
        quantity: this.qty
      }
      this.$store.dispatch('addMore', payload)
        .then((result) => {
          this.$store.dispatch('getCarts')
          this.qty = 0
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
    },
    deletebtn (id) {
      this.$store.dispatch('deleteCart', id)
        .then((result) => {
            this.$store.dispatch('getCarts')
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
              title: 'Deleted successfully'
            })
          })
    }
  }
}
</script>

<style scoped>
.card {
  width: 700px;
  margin: 5px;
}

.img-card {
  width: 100%;
  height: 625px;
}

.btn-detail {
  margin-top: 10px;
}

#qty {
  border-radius: 5px;
  padding-bottom: 4px;
  height: 34px;
  width: 33px;
  margin-right: 5px;
  text-align: center;
  color: black;
}

.desc {
  height: 50px;
}

.deletebtn {
  z-index: 2;
  position: absolute;
  margin-top: 10px;
  margin-left: -20px;
  float: left;
}

#checkoutbtn{
  margin-left: 5px;
}

.usericon {
  background-color: rgb(255, 255, 255);
  padding: 5px;
  color: blue;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-right: -10px;
  margin-left: 30px;
  margin-top: -5px;
  border-radius: 50px;
}

.tags {
  position: absolute;
  width: 100%;
  float: right;
  margin-top: 5px;
  margin-left: 300px;
  color: white;
  z-index: 2;
}

.card {
  border: none;
  margin-bottom: 20px;
}

.card-body {
  width: inherit;
  height: inherit;
  position: absolute;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}

.bodycard{
  margin-top: 190px;
  width: 350px;
  height: 180px;
}

.card-body p,
.card-body h5 {
  color: rgb(255, 255, 255);
}

.usericon:hover {
  background: rgb(211, 211, 211);
  color: red;
  text-decoration: none;
}
</style>
