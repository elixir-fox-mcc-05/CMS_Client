<template>
  <div>
    <h3>Add Product</h3>
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">format_size</i>
          <input v-model="newProduct.name" id="newProductName" type="text">
          <label for="first_name">Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">reorder</i>
          <select id="newProductCategory" v-model="newProduct.category">
            <option value="" disabled selected>Choose category</option>
            <option value="Gaming Notebook">Gaming Notebook</option>
            <option value="Gaming PC">Gaming PC</option>
            <option value="Notebook">Notebook</option>
            <option value="PC">PC</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Tablet">Tablet</option>
          </select>
          <label>Category</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">description</i>
          <textarea v-model="newProduct.description" id="newProductDescription" class="materialize-textarea"></textarea>
          <label for="newProductDescription">Description</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">attach_money</i>
          <input v-model="newProduct.price" id="newProductPrice" type="number" class="validate">
          <label for="newProductPrice">Price</label>
          <span class="helper-text" data-error="" data-success="">Price can not be negative</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">storage</i>
          <input v-model="newProduct.stock" id="newProductStock" type="number" class="validate">
          <label for="password">Stock</label>
          <span class="helper-text" data-error="" data-success="">Stock can not be negative</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">camera_alt</i>
          <input v-model="newProduct.image_url" id="newProductImgUrl" type="url" class="validate">
          <label for="newProductImgUrl">Image URL</label>
        </div>
      </div>
      <button class="btn" @click.prevent="addNewProduct"><i class="material-icons left">add_box</i>Add Product</button>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min.js'
import server from '../api/index'

export default {
  name: 'AddProduct',
  data () {
    return {
      newProduct: {
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        image_url: ''
      }
    }
  },
  methods: {
    addNewProduct () {
      server({
        method: 'post',
        url: '/product',
        headers: {
          token: localStorage.token
        },
        data: {
          name: this.newProduct.name,
          category: this.newProduct.category,
          description: this.newProduct.description,
          price: this.newProduct.price,
          stock: this.newProduct.stock,
          image_url: this.newProduct.image_url
        }
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    const selectForm = document.querySelectorAll('#newProductCategory')
    M.FormSelect.init(selectForm)
  }
}
</script>

<style>

</style>
