<template>
  <div>
    <a class="uk-button uk-button-default btn-open" href="#modal-center" uk-toggle v-if="isAdmin">New Product</a>
    <div id="modal-center" class="uk-flex-top" uk-modal>
      <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <label><b>Product Name</b></label>
        <input type="text" v-model="name">
        <label><b>Price</b></label>
        <input type="number" v-model="price">
        <label><b>Stock</b></label>
        <input type="number" v-model="stock">
        <label><b>Image Url</b></label>
        <input type="text" v-model="image">
        <label><b>Tags</b></label>
        <input type="text" v-model="tags">
        <button class="button-go" @click="addProduct">Add Product</button>
        <button type="button" class="cancelbtn">Cancel</button>
        <button class="uk-modal-close-default" type="button" uk-close></button>
      </div>
    </div>
    <div v-if="loading" class="loader"></div>
    <div class="product-container">
      <Product v-for="product in products" :key="product.id" :product="product"> </Product>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Product from '../components/Product'
export default {
  name: 'Dashboard',
  data () {
    return {
      loading: false,
      name: '',
      price: '',
      stock: '',
      image: '',
      tags: ''
    }
  },
  components: {
    Product
  },
  created () {
    this.loading = true
    this.$store.state.total = 0
    this.$store.dispatch('fect')
      .then((result) => {
        this.loading = false
      })
    if (localStorage.access_token) {
      this.$store.commit('SET_LOGIN', true)
      if (localStorage.admin) {
        this.$store.commit('SET_ADMIN', true)
      }
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isAdmin () {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    addProduct () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/product',
        data: {
          name: this.name,
          price: this.price,
          stock: this.stock,
          image: this.image,
          tags: this.tags
        },
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        console.log('sssssssssssssssssssssssssssssssssssss')
        this.$store.dispatch('fect')
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
  .btn-open {
    border: goldenrod 2px solid;
    margin-bottom: 60px;
  }
  .product-container {
    display: flex;
    flex-wrap: wrap;
  }
  .loader {
    align-content: center;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    position: absolute;
    width: 300px;
    height: 200px;
    z-index: 15;
    top: 50%;
    left: 50%;
    margin: -100px 0 0 -150px;
    border-top: 16px solid greenyellow;
    border-right: 16px solid slateblue;
    border-bottom: 16px solid crimson;
    border-left: 16px solid darkorange;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Button used to open the contact form - fixed at the bottom of the page */
.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 280px;
}

/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

/* Full-width input fields */
.form-container input[type=text], .form-container input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

/* When the inputs get focus, do something */
.form-container input[type=text]:focus, .form-container input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/login button */
.form-container .btn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}
.home{
  padding: 5% 30%;
}
form {
  border: 3px solid #f1f1f1;
}

/* Full-width inputs */
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
.button-go {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 12px;
  border: none;
  cursor: pointer;
  width: 40%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: 40%;
  padding: 14px 20px;
  background-color: #f44336;
}

/* Add padding to containers */
.container {
  padding: 15px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>
