<template>
  <div>
    <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  <form>
                      <div class="form-group">
                          <label for="formGroupExampleInput">Product Name</label>
                          <input type="text" class="form-control" id="formGroupExampleInput" v-model="name">
                      </div>
                      <div class="form-group">
                          <label for="formGroupExampleInput2">Image</label>
                          <input type="text" class="form-control" id="formGroupExampleInput2" v-model="image_url">
                      </div>
                      <div class="form-group">
                          <label for="formGroupExampleInput">Price</label>
                          <input type="number" class="form-control" id="formGroupExampleInput" v-model="price">
                      </div>
                      <div class="form-group">
                          <label for="formGroupExampleInput2">Stock</label>
                          <input type="number" class="form-control" id="formGroupExampleInput2" v-model="stock">
                      </div>
                  </form>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="updateProduct">Save changes</button>
              </div>
          </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Delete Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p style="text-align: left;">are you sure to delete this product?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="deleteProduct">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
          <thead class="thead-dark">
              <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">More</th>
              </tr>
          </thead>
          <tbody v-for="product in products" :key="product.id">
              <tr>
                  <td>{{product.id}}</td>
                  <td>{{product.name}}</td>
                  <td>{{product.image_url}}</td>
                  <td>Rp. {{product.price}}</td>
                  <td>{{product.stock}}</td>
                  <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter1" @click.prevent="getProduct(product)">Update</button>  <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModalCenter2" @click.prevent="getProduct(product)">Delete</button></td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'fetchProduct',
  data () {
    return {
      id: null,
      name: '',
      image_url: '',
      stock: null,
      price: null
    }
  },
  methods: {
    getProduct (product) {
      this.id = product.id
      this.name = product.name
      this.image_url = product.image_url
      this.price = product.price
      this.stock = product.stock
    },
    updateProduct () {
      axios({
        method: 'put',
        url: `https://calm-beyond-37965.herokuapp.com/product/${this.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: this.name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock
        }
      })
        .then(data => {
          this.$store.dispatch('fetchProduct')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct () {
      axios({
        method: 'delete',
        url: `https://calm-beyond-37965.herokuapp.com/product/${this.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          this.$store.dispatch('fetchProduct')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.dispatch('fetchProduct')
    }
  }
}
</script>

<style>

</style>
