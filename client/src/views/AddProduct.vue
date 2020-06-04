<template>
    <div class="container mb-5">
        <div class="row">
        <div class="col-lg-12">
            <h1>Add Product</h1>
            <h5 class="text-center text-danger" v-if="errorMessage">{{ errorMessage }} </h5>
            <form class="my-4" @submit.prevent="newProduct">
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"><strong>Name</strong></label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" v-model="addName" placeholder="Product Name" required>
                        <small class="form-text text-muted">
                            Product Name must be 1-60 characters long
                        </small>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"><strong>Description</strong></label>
                    <div class="col-sm-10">
                        <textarea type="text" class="form-control" v-model="addDescription" placeholder="Product Description"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"><strong>Price (IDR)</strong></label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" v-model="addPrice" min="0" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"><strong>Stock</strong></label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" v-model="addStock" min="0" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"><strong>Image URL</strong></label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" v-model="addImageUrl" placeholder="Product Image URL">
                    </div>
                </div>
                 <div class="form-group row">
                    <label class="col-sm-2"></label>
                    <img :src="addImageUrl" class="img-thumbnail img-fluid col-sm-10 text-center" alt="NO IMAGE URL">
                </div>
                <div class="form-group row">
                    <div class="col">
                    </div>
                    <div class="col">
                        <button type="submit" class="btn btn-success">SUBMIT</button>
                    </div>
                    <div class="col">
                        <button type="reset" class="btn btn-danger">RESET</button>
                    </div>
                </div>
            </form>
            <button type="button" @click="cancel" class="btn btn-warning mb-5">Cancel</button>
        </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'AddProduct',
  data () {
    return {
      addName: '',
      addDescription: '',
      addImageUrl: '',
      addPrice: 0,
      addStock: 0,
      errorMessage: false
    }
  },
  methods: {
    ...mapMutations(['SET_LOGIN']),
    ...mapActions(['addProduct']),
    cancel () {
      this.$router.push('/mainPage')
    },
    newProduct () {
      this.addProduct({
        token: localStorage.token,
        name: this.addName,
        description: this.addDescription,
        image_url: this.addImageUrl,
        price: this.addPrice,
        stock: this.addStock
      })
        .then(data => {
          this.$router.push('/mainPage')
          this.errorMessage = false
        })
        .catch(err => {
          this.errorMessage = err.response.data.errors[0].message
        })
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push('/')
      this.SET_LOGIN(false)
    } else {
      this.SET_LOGIN(true)
    }
  }
}
</script>

<style>
</style>
