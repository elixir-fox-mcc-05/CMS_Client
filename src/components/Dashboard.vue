<template>
  <div>
    <div class="d-flex justify-content-center">
        <p>{{errorMsg}}</p>
    </div>
    <div class="mt-3 d-flex justify-content-center">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalAdd" data-dismiss="modal" aria-label="close">Add Product</button>
    </div>
    <br>
    <div class="row justify-content-between">
        <div class="column lg-2" v-for="item in products" :key="item.id">
            <div class="card" style="width: 20rem;">
                <img :src="`${item.img_url}`" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">{{item.name}}</h5>
                    <label for="">Price : Rp {{item.price}} </label><br>
                    <label for="">Stock : {{item.stock}} </label><br>
                    <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#ModalUpdate" data-dismiss="modal" aria-label="close" v-on:click.prevent="getItemDetail(item)">Update</button> |
                    <button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#ModalDelete" data-dismiss="modal" aria-label="close" v-on:click.prevent="getItemDetail(item)">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Add Product -->
    <div class="modal fade" id="ModalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h1 class="modal-title" id="exampleModalLabel">Add Product</h1>
              <p> {{errorMsg}} </p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <form v-on:submit.prevent="addProduct()">
                <label>Name:</label><br>
                <input id="addProductName" type="text" v-model="addProductName"><br>
                <label for="">Image Url :</label><br>
                <input type="text" id="addProductImgUrl" v-model="addProductImg"><br>
                <label for="">Price :</label><br>
                <input type="text" id="addProductPrice" v-model="addProductPrice"><br>
                <label for="">Stock :</label><br>
                <input type="text" id="addProductStock" v-model="addProductStock"><br>
                <label for="">Category :</label><br>
                <select name="productCategory" id="productCategory" v-model="CategoryId">
                    <option v-for="item in category" :key="item.id" :value="item.id"> {{item.name}} </option>
                </select>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="addProduct()">Add Product</button>
          </div>
          </div>
      </div>
    </div>
    <!--  -->
    <!-- Update Product -->
    <div class="modal fade" id="ModalUpdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h1 class="modal-title" id="exampleModalLabel">Update Product</h1>
              <p> {{errorMsg}} </p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <form v-on:submit.prevent="updateProduct()">
                <label>Name:</label><br>
                <input id="productName" type="text" v-model="productName"><br>
                <label for="">Image Url :</label><br>
                <input type="text" id="productImg" v-model="productImg"><br>
                <label for="">Price :</label><br>
                <input type="text" id="productPrice" v-model="productPrice"><br>
                <label for="">Stock :</label><br>
                <input type="text" id="productStock" v-model="productStock"><br>
                <label for="">Category :</label><br>
                <select name="productCategory" id="productCategory" v-model="CategoryId">
                    <option v-for="item in category" :key="item.id" :value="item.id"> {{item.name}} </option>
                </select>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="updateProduct()">Update Product</button>
          </div>
          </div>
      </div>
    </div>
    <!--  -->
    <!-- Delete Product -->
    <div class="modal fade" id="ModalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h1 class="modal-title" id="exampleModalLabel">Delete Product</h1>
              <p> {{errorMsg}} </p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <form v-on:submit.prevent="deleteProduct()">
                <label>Name:</label><br>
                <input id="productName" type="text" v-model="productName"><br>
                <label for="">Image Url :</label><br>
                <input type="text" id="productImg" v-model="productImg"><br>
                <p>Are you sure to delete this product?</p>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="deleteProduct()">delete</button>
          </div>
          </div>
      </div>
    </div>
    <!--  -->

  <!--  -->
  </div>
</template>

<script>
import axios from 'axios'
const baseUrl = 'http://localhost:3000'

export default {
  name: 'Dashboard',
  data () {
    return {
      errorMsg: '',
      products: [],
      category: [],
      addProductName: '',
      addProductImg: '',
      addProductPrice: null,
      addProductStock: null,
      CategoryId: null,
      productId: null,
      productName: '',
      productImg: '',
      productPrice: null,
      productStock: null
    }
  },
  methods: {
    fetchCategory () {
      axios({
        method: 'get',
        url: baseUrl + '/category',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          // console.log(response.data.Category)
          this.category = response.data.Category
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchData () {
      // console.log('masuk')
      axios({
        method: 'get',
        url: baseUrl + '/product',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          // console.log(response.data.Products)
          this.products = response.data.Products
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    addProduct () {
      axios({
        method: 'post',
        url: baseUrl + '/product',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          name: this.addProductName,
          img_url: this.addProductImg,
          price: this.addProductPrice,
          stock: this.addProductStock,
          CategoryId: this.CategoryId
        }
      })
        .then(response => {
          console.log(response)
          this.fetchData()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getItemDetail (data) {
      this.productId = data.id
      this.productName = data.name
      this.productImg = data.img_url
      this.productPrice = data.price
      this.productStock = data.stock
      this.CategoryId = data.CategoryId
    },
    updateProduct () {
      axios({
        method: 'put',
        url: baseUrl + '/product/' + this.productId,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          name: this.productName,
          img_url: this.productImg,
          price: this.productPrice,
          stock: this.productStock,
          CategoryId: this.CategoryId
        }
      })
        .then(response => {
          console.log(response)
          this.fetchData()
          this.productName = ''
          this.productImg = ''
          this.productPrice = ''
          this.productStock = ''
          this.CategoryId = ''
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteProduct () {
      axios({
        method: 'delete',
        url: baseUrl + '/product/' + this.productId,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response)
          this.fetchData()
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  computed: {
    setCurrentUser () {
      return this.$store.state.currentUser
    }
  },
  created () {
    this.fetchData()
    this.fetchCategory()
    this.$store.commit('set_login', true)
  }
}
</script>

<style scoped>

</style>>
