<template>
  <div class="container">
        <h1>Dashboard</h1>
        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter">Add Product</button>  <button type="button" class="btn btn-danger" id="button-add" @click.prevent="logout">Logout</button><br><br>
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="e.g nike hypervenom" v-model="name">
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Image</label>
                                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Enter URL" v-model="image_url">
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
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="addProduct">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <fetchProduct />
    </div>
</template>

<script>
import axios from 'axios'
import fetchProduct from '@/components/fetchProduct.vue'
export default {
  name: 'HomePage',
  components: {
    fetchProduct
  },
  data () {
    return {
      name: '',
      image_url: '',
      price: null,
      stock: null
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'LoginPage' })
    },
    addProduct () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/product',
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
          console.log(data)
        //   fetchProduct
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    if (!localStorage.access_token) {
      this.$router.push({ name: 'LoginPage' })
    }
  }
}
</script>

<style>

</style>
