<template>
    <div class="container mb-5">
        <div class="row">
        <div class="col-lg-12">
            <h1>Update Product Data</h1>
            <h5 class="text-center text-danger" v-if="errorMessage">{{ errorMessage }} </h5>
            <form class="my-4" @submit.prevent="editProduct">
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"><strong>Name</strong></label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" v-model="editName" placeholder="Product Name" required>
                        <small id="passwordHelpBlock" class="form-text text-muted">
                            Product Name must be 1-60 characters long
                        </small>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"><strong>Description</strong></label>
                    <div class="col-sm-10">
                        <textarea type="text" class="form-control" v-model="editDescription" placeholder="Product Description"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"><strong>Price (IDR)</strong></label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" v-model="editPrice" min="0" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"><strong>Stock</strong></label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" v-model="editStock" min="0" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label"><strong>Image URL</strong></label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" v-model="editImageUrl" placeholder="Product Image URL">
                    </div>
                </div>
                 <div class="form-group row">
                    <label class="col-sm-2"></label>
                    <img :src="editImageUrl" class="img-thumbnail img-fluid col-sm-10 text-center" alt="NO IMAGE URL">
                </div>
                <div class="form-group row">
                    <div class="col">
                    </div>
                    <div class="col">
                        <button type="submit" class="btn btn-info">UPDATE</button>
                    </div>
                    <div class="col">
                        <b-button id="popover-button-variant" class="btn btn-danger">DELETE</b-button>
                        <b-popover target="popover-button-variant" placement="top" variant="danger" triggers="focus">
                          <template v-slot:title>Are you sure?</template>
                          <div class="text-center">
                            <button type="button" @click="productDelete" class="btn btn-dark btn-sm">Yes</button>
                          </div>
                        </b-popover>
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
  name: 'DetailProduct',
  data () {
    return {
      productId: this.$route.params.productId,
      editName: '',
      editDescription: '',
      editImageUrl: '',
      editPrice: 0,
      editStock: 0,
      errorMessage: false
    }
  },
  methods: {
    ...mapMutations(['SET_LOGIN']),
    ...mapActions(['searchProduct', 'updateProduct', 'deleteProduct']),
    cancel () {
      this.$router.push('/mainPage')
    },
    editProduct () {
      this.updateProduct({
        token: localStorage.token,
        productId: this.productId,
        editName: this.editName,
        editDescription: this.editDescription,
        editImageUrl: this.editImageUrl,
        editPrice: this.editPrice,
        editStock: this.editStock
      })
        .then(data => {
          this.$router.push('/mainPage')
          this.errorMessage = false
        })
        .catch(err => {
          this.errorMessage = err.response.data.errors[0].message
        })
    },
    productDelete () {
      this.deleteProduct({
        productId: this.productId,
        token: localStorage.token
      })
        .then(data => {
          this.$router.push('/mainPage')
          this.errorMessage = false
        })
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push('/')
      this.SET_LOGIN(false)
    } else {
      this.SET_LOGIN(true)
      this.searchProduct({
        productId: this.productId,
        token: localStorage.token
      })
        .then(({ data }) => {
          this.editName = data.product.name
          if (data.product.description === 'No description') {
            this.editDescription = ''
          } else {
            this.editDescription = data.product.description
          }
          if (data.product.image_url === 'No image available') {
            this.editImageUrl = ''
          } else {
            this.editImageUrl = data.product.image_url
          }
          this.editPrice = data.product.price
          this.editStock = data.product.stock
        })
    }
  }
}
</script>

<style>
</style>
