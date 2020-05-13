<template>
<form class="form-style-9">
  <div class="form-group">
<input type="hidden" id="nama" class="form-control" placeholder="Product Name" v-model="deploy.Id">
</div>
<div class="form-group">
<label for="nama">Name</label>
<input type="text" id="nama" class="form-control" placeholder="Product Name" v-model="deploy.name">
</div>
<div class="form-group">
<label for="image">image_url</label>
<input type="text" id="image" class="form-control" placeholder="image url" v-model="deploy.image_url">
</div>
<div class="form-group">
<label for="price">price</label>
<input type="number" id="price" class="form-control" placeholder="price" v-model="deploy.price">
</div>
<div class="form-group">
<label for="stock">stock</label>
<input type="number" id="stock" class="form-control" placeholder="stock" v-model="deploy.stock">
</div>
<b-button type="submit" variant="primary" @click.prevent="updateData">Submit</b-button>
 <b-button type="reset" variant="danger" @click.prevent="cancelbutton">Reset</b-button>
</form>
</template>

<script>
import axios from '@/axios'
export default {
  name: 'formEditItem',
  data () {
    return {
      id: '',
      deploy: {
        name: '',
        image_url: '',
        price: 0,
        stock: 0
      }

    }
  },
  methods: {
    updateData (deploy) {
      axios({
        method: 'PUT',
        url: '/product/' + this.id,
        data: this.deploy,
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.$toasted.global.my_app_success({
            message: 'Succes Edit Item '
          })
          this.$store.dispatch('fetchProduct')
          this.$router.push('/home/stock/tabelstock')
        })
        .catch(err => {
          this.$toasted.global.my_app_error({
            message: err
          })
          console.log(err)
        })
    },
    cancelbutton () {
      this.$router.push('/home/stock/tabelstock')
    }
  },
  created () {
    this.id = this.$route.params.id
    axios({
      method: 'GET',
      url: '/product/' + this.id,
      data: this.deploy,
      headers: {
        token: localStorage.token
      }
    })
      .then(result => {
        console.log('result edit', result)
        this.deploy.name = result.data.data.name
        this.deploy.image_url = result.data.data.image_url
        this.deploy.price = result.data.data.price
        this.deploy.stock = result.data.data.stock
      })
  }
}
</script>

<style type="text/css">
.form-style-9{
max-width: 450px;
background: #FAFAFA;
padding: 30px;
margin: 50px auto;
box-shadow: 1px 1px 25px rgba(0, 0, 0, 0.35);
border-radius: 10px;
border: 6px solid #305A72;
}
.form-style-9 ul{
padding:0;
margin:0;
list-style:none;
}
.form-style-9 ul li{
display: block;
margin-bottom: 10px;
min-height: 35px;
}
.form-style-9 ul li  .field-style{
box-sizing: border-box;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
padding: 8px;
outline: none;
border: 1px solid #B0CFE0;
-webkit-transition: all 0.30s ease-in-out;
-moz-transition: all 0.30s ease-in-out;
-ms-transition: all 0.30s ease-in-out;
-o-transition: all 0.30s ease-in-out;

}.form-style-9 ul li  .field-style:focus{
box-shadow: 0 0 5px #B0CFE0;
border:1px solid #B0CFE0;
}
.form-style-9 ul li .field-split{
width: 49%;
}
.form-style-9 ul li .field-full{
width: 100%;
}
.form-style-9 ul li input.align-left{
float:left;
}
.form-style-9 ul li input.align-right{
float:right;
}
.form-style-9 ul li textarea{
width: 100%;
height: 100px;
}
.form-style-9 ul li input[type="button"],
.form-style-9 ul li input[type="submit"] {
-moz-box-shadow: inset 0px 1px 0px 0px #3985B1;
-webkit-box-shadow: inset 0px 1px 0px 0px #3985B1;
box-shadow: inset 0px 1px 0px 0px #3985B1;
background-color: #216288;
border: 1px solid #17445E;
display: inline-block;
cursor: pointer;
color: #FFFFFF;
padding: 8px 18px;
text-decoration: none;
font: 12px Arial, Helvetica, sans-serif;
}
.form-style-9 ul li input[type="button"]:hover,
.form-style-9 ul li input[type="submit"]:hover {
background: linear-gradient(to bottom, #2D77A2 5%, #337DA8 100%);
background-color: #28739E;
}
</style>
