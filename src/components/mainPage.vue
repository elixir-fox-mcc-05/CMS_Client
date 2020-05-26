<template>
  <div>
    <div class="mt-3 d-flex justify-content-end">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalCreate" data-whatever="newtask" data-dismiss="modal" aria-label="close">Create</button>
    </div>
    <div class="d-flex justify-content-center">
        <p> {{errMsg}} </p>
    </div>
    <div class="row mt-3 justify-content-between">
        <div class="column md-3" v-for="item in products" :key="item.id">
            <div class="card" style="width: 20rem;">
                <img :src="`${item.imageUrl}`" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">{{item.name}}</h5>
                    <label for="">Price : Rp.{{item.price}} </label><br>
                    <label for="">Stock : {{item.stock}} </label><br>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalUpdate" data-whatever="update" data-dismiss="modal" aria-label="close" v-on:click.prevent="getItem(item)">update</button>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalDelete" data-whatever="update" data-dismiss="modal" aria-label="close" v-on:click.prevent="getItem(item)">delete</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Create -->
          <div class="modal fade" id="ModalCreate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                  <div class="modal-header">
                      <h1 class="modal-title" id="exampleModalLabel">Add Product</h1>
                      <p> {{errMsg}} </p>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      <form v-on:submit.prevent="createProduct()">
                        <label >Product Name:</label>
                        <input id="nameProduct" type="text" placeholder="Product name .." v-model="nameProductCreate"><br>
                        <label for="">Price :</label>
                        <input type="priceProduct" id="priceProduct" v-model="priceProductCreate"><br>
                        <label for="">Stock :</label>
                        <input type="stockProduct" id="stockProduct" v-model="stockProductCreate"><br>
                        <label for="">ImageUrl :</label>
                        <input type="imageUrlProduct" id="imageUrlProduct" v-model="imageUrlProductCreate"><br>
                        <label for="">Type :</label>
                        <select name="typeProduct" id="typeProduct" v-model="CategoryId">
                            <option v-for="item in type" :key="item.id" :value="item.id"> {{item.type}} </option>
                        </select>
                      </form>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="createProduct()">Add Product</button>
                  </div>
                  </div>
              </div>
          </div>
          <!-- Modal Update -->
            <div class="modal fade" id="ModalUpdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                  <div class="modal-header">
                      <h1 class="modal-title" id="exampleModalLabel">Update Product</h1>
                      <p> {{errMsg}} </p>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      <form v-on:submit.prevent="updateItem()">
                        <label >Product Name:</label>
                        <input id="nameProduct" type="text" placeholder="Product name .." v-model="nameProduct"><br>
                        <label for="">Price :</label>
                        <input type="priceProduct" id="priceProduct" v-model="priceProduct"><br>
                        <label for="">Stock :</label>
                        <input type="stockProduct" id="stockProduct" v-model="stockProduct"><br>
                        <label for="">ImageUrl :</label>
                        <input type="imageUrlProduct" id="imageUrlProduct" v-model="imageUrlProduct"><br>
                        <label for="">Type :</label>
                        <select name="typeProduct" id="typeProduct" v-model="CategoryId">
                            <option v-for="item in type" :key="item.id" :value="item.id"> {{item.type}} </option>
                        </select>
                      </form>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="updateItem()">update Product</button>
                  </div>
                  </div>
              </div>
          </div>
          <!-- Modal Delete -->
            <div class="modal fade" id="ModalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                  <div class="modal-header">
                      <h1 class="modal-title" id="exampleModalLabel">Delete Product</h1>
                      <p>Do you really want to remove this ?</p>
                      <p> {{errMsg}} </p>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                        <label>Product Name: {{nameProduct}}</label><br>
                        <label>Price : {{priceProduct}} </label><br>
                        <label> Stock : {{stockProduct}} </label><br>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="deleteItem()">Delete Product</button>
                  </div>
                  </div>
              </div>
          </div>
  </div>
</template>

<script>
import axios from 'axios'
const baseUrl = 'http://localhost:3000'

export default {
  name: 'MainPage',
  data () {
    return {
      products: [],
      nameProduct: '',
      priceProduct: null,
      stockProduct: null,
      imageUrlProduct: '',
      idProduct: '',
      nameProductCreate: '',
      priceProductCreate: null,
      stockProductCreate: null,
      imageUrlProductCreate: '',
      errMsg: '',
      CategoryId: null,
      type: []
    }
  },
  methods: {
    fetchType () {
      axios({
        method: 'get',
        url: baseUrl + '/categories/'
      })
        .then(response => {
          this.type = response.data.Categories
          console.log(this.type, 'ini type')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchData () {
      axios({
        method: 'get',
        url: baseUrl + '/products/'
      })
        .then(response => {
          console.log(response.data.products)
          this.products = response.data.products
          console.log(this.products, 'ini this')
        })
        .catch(err => {
          console.log(err)
        })
    },
    createProduct () {
      console.log(this.CategoryId, 'categoryid')
      axios({
        method: 'post',
        url: `${baseUrl}/products/`,
        data: {
          name: this.nameProductCreate,
          price: this.priceProductCreate,
          stock: this.stockProductCreate,
          imageUrl: this.imageUrlProductCreate,
          CategoryId: this.CategoryId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response)
          this.fetchData()
        })
        .catch(err => {
          console.log(err)
          setTimeout(() => {
            this.errMsg = ''
          }, 2000)
          this.errMsg = err.response.data.error
        })
    },
    getItem (data) {
      this.nameProduct = data.name
      this.priceProduct = data.price
      this.stockProduct = data.stock
      this.imageUrlProduct = data.imageUrl
      this.idProduct = data.id
      console.log(data, ' ini data getItem')
    },
    updateItem () {
      axios({
        method: 'put',
        url: baseUrl + '/products/' + this.idProduct,
        data: {
          name: this.nameProduct,
          price: this.priceProduct,
          stock: this.stockProduct,
          imageUrl: this.imageUrlProduct
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response, 'ini update')
          this.fetchData()
          this.nameProduct = ''
          this.priceProduct = ''
          this.stockProduct = ''
          this.imageUrlProduct = ''
        })
        .catch(err => {
          console.log(err.response.data, 'ini err update')
          setTimeout(() => {
            this.errMsg = ''
          }, 2000)
          this.errMsg = err.response.data.message
        })
    },
    deleteItem () {
      axios({
        method: 'delete',
        url: baseUrl + '/products/' + this.idProduct,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          this.fetchData()
          this.nameProduct = ''
          this.priceProduct = ''
          this.stockProduct = ''
          this.imageUrlProduct = ''
          console.log(response, 'ini data delete')
        })
        .catch(err => {
          console.log(err.response.data.error)
          setTimeout(() => {
            this.errMsg = ''
          }, 2000)
          this.errMsg = err.response.data.message
        })
    }
  },
  computed: {
    setCurrentUserName () {
      return this.$store.state.currentUserName
    }
  },
  created () {
    this.fetchType()
    this.fetchData()
    // console.log(this.$store.state.currentUserName, 'ini username')
    this.$store.commit('set_login', true)
  }
}
</script>

<style scoped>

</style>>
