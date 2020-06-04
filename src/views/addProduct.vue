<template>
  <div id="addProduct">
      <div class="container">
          <div class="row">
            <div class="col-10 mx-auto p-3 m-2" style="background-color:#2ecc71; display:flex; justify-content:center;border-radius:8px;">
             <form class="col-5">
                <label class="control-label" for="newProductName"><b>Product name:</b></label>
                <input class="form-control" id="newProductName" placeholder="Product name" v-model="newProduct.productName"><br>
                <label class="control-label" for="newProductImageUrl"><b>URL link to product image:</b></label>
                <input class="form-control" id="newProductImageUrl" placeholder="URL link to product image" v-model="newProduct.image_url"><br>
                <label class="control-label" for="newProductPrice"><b>Price:</b></label>
                <input class="form-control" type="number" id="newProductPrice" placeholder="Product price" v-model="newProduct.price"><br>
                <label class="control-label" for="newProductStock"><b>Stock:</b></label>
                <input class="form-control" type="number" id="newProductStock" placeholder="Product Stock" v-model="newProduct.stock"><br>
                <label class="control-label" for="newProductCategory"><b>Category:</b></label>
                <select  class="form-control" id="newProductCategory" name="newProductCategory" v-model="newProduct.category">
                    <option disabled>-- Please select a product category --</option>
                    <option id="newProductCategory" v-for="category in allCategory" :key="category.id" :value="category.name"><b>{{category.name}}</b></option>
                </select><br><br>
                <!-- <label class="control-label" for="newProductCategory"><b>Category:</b></label>
                <input class="form-control" id="newProductCategory" placeholder="Product category" v-model="newProduct.category"><br> -->
                <button type="button" @click="addNewProduct()" class="btn btn-primary" style="margin: 0px 10px;">Add new product</button>
                <router-link to="/dashboard"><button type="button" class="btn btn-danger">Cancel</button></router-link>
             </form>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'addProduct',
  data () {
    return {
      newProduct: {
        productName: '',
        image_url: '',
        price: '',
        stock: '',
        category: ''
      }
    }
  },
  computed: {
    allCategory () {
      return this.$store.state.allCategory
    }
  },
  methods: {
    addNewProduct () {
      axios({
        method: 'POST',
        url: 'https://peaceful-peak-29407.herokuapp.com/products',
        // url: 'http://localhost:3000/products',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: this.newProduct.productName,
          image_url: this.newProduct.image_url,
          price: this.newProduct.price,
          stock: this.newProduct.stock,
          category: this.newProduct.category
        }
      })
        .then(result => {
          this.$router.push('/dashboard')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

}
</script>

<style scoped>
label{
  display:flex;
  justify-content: flex-start;
}
</style>
