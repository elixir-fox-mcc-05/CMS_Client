<template>
  <div>
    <h3>Add Product</h3>
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input v-model="newProduct.name" id="newProductName" type="text" class="validate">
          <label for="first_name">Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
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
          <textarea v-model="newProduct.description" id="newProductDescription" class="materialize-textarea"></textarea>
          <label for="newProductDescription">Description</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input v-model="newProduct.price" id="newProductPrice" type="number" class="validate">
          <label for="newProductPrice">Price</label>
          <span class="helper-text" data-error="" data-success="">Price can not be negative</span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input v-model="newProduct.stock" id="newProductStock" type="number" class="validate">
          <label for="password">Stock</label>
          <span class="helper-text" data-error="" data-success="">Stock can not be negative</span>
        </div>
      </div>
      <button class="btn">Add Product</button>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min.js'

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
        file: ''
      }
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
