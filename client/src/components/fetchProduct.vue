<template>
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
                        <td><button type="button" class="btn btn-info">Update</button>  <button type="button" class="btn btn-info">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'fetchProduct',
  data () {
    return {
      products: []
    }
  },
  methods: {
    fetchProduct () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/product',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          console.log(data)
          this.products = data.data.products
        //   console.log(this.products)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    if (localStorage.access_token) {
      this.fetchProduct()
    }
  }
}
</script>

<style>

</style>
