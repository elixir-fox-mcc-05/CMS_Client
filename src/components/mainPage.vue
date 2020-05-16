<template>
  <div>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Sneakers</a>
        <div class="btn btn-dark ml-auto" id="log-out" v-on:click.prevent="logout" >Logout</div>
        </nav>
    </div>
    <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalCreate" data-whatever="newtask" data-dismiss="modal" aria-label="close">Create</button>
    </div>
    <div class="row">
        <div class="column" v-for="item in products" :key="item.id">
            <div class="card" style="width: 18rem;">
                <img :src="`${item.imageUrl}`" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">{{item.name}}</h5>
                    <label for="">Price : Rp.{{item.price}} </label><br>
                    <label for="">Stock : {{item.stock}} </label><br>
                    <a href="#" class="btn btn-primary">add to cart</a>
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
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      <form v-on:submit.prevent="createProduct()">
                        <label >Product Name:</label>
                        <input id="nameProduct" type="text" placeholder="Product name .." v-model="nameProduct"><br>
                        <label for="">Price :</label>
                        <input type="priceProduct" id="priceProduct" v-model="priceProduct"><br>
                        <label for="">Stock :</label>
                        <input type="stockProduct" id="stockProduct" v-model="stockProduct"><br>
                        <label for="">ImageUrl :</label>
                        <input type="imageUrlProduct" id="imageUrlProduct" v-model="imageUrlProduct"><br>
                      </form>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="createProduct()">Add Product</button>
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
      priceProduct: 0,
      stockProduct: 0,
      imageUrlProduct: ''
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'LandingPage' })
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
      axios({
        method: 'post',
        url: `${baseUrl}/products/`,
        data: {
          name: this.nameProduct,
          price: this.priceProduct,
          stock: this.stockProduct,
          imageUrl: this.imageUrlProduct
        },
        headers: {
          token: this.setToken
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    setToken () {
      return this.$store.state.token
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>

</style>>
