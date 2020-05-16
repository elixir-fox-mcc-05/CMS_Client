<template>
  <div class="home">

  <mdb-container class="mt-5" id="categoriesTable">
    <mdb-row class="mt-5 align-items-left justify-content-start">
      <section class="col-md-12">
        <h3>All Products</h3>
        <br />
        <mdb-btn @click="showAddModal = true; addHasError = false" color="primary" class="m-0"><i class="fas fa-book mr-2" aria-hidden="true"></i>Add New</mdb-btn>
        <br />
        <mdb-tbl btn responsive striped class="my-5 rounded-top border border-light border-bottom-0 ">
          <mdb-tbl-head class="tempting-azure-gradient">
            <tr>
              <th>No</th>
              <th>Category </th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </mdb-tbl-head>
          <mdb-tbl-body>

            <tr v-for="(product, index) in products" :key="product.id" scope="row">

              <td>{{ index+1 }}</td>
              <td>{{ product.Category.name }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }}</td>
              <td class="col-md-4">
                
                <router-link :to="`/products/${ product.id }/detail`" class=""><mdb-btn color="success" class=" btn-sm"><i class="fas fa-info-circle mr-2" aria-hidden="true"></i>Detail</mdb-btn></router-link>
                <mdb-btn @click="openEdit(product.id, product.CategoryId, product.Category.name, product.name, product.price, product.stock, index)" color="info" class=" btn-sm"><i class="fas fa-pencil-alt mr-2" aria-hidden="true"></i>Edit</mdb-btn> 
                <mdb-btn @click="openDelete(product.id, product.name, index)" color="danger" class=" btn-sm"><i class="fas fa-trash mr-2" aria-hidden="true"></i> Delete</mdb-btn>
              </td>
            </tr>
            
            <tr v-if="products.length === 0" scope="row">
              <td colspan="6">
                No item here
              </td>
            </tr>
          
          </mdb-tbl-body>
        </mdb-tbl>
      </section>
    </mdb-row>


    <!-- //// -->


    <mdb-row class="mt-5">
      <section class="col-md-12">
        <h3>Picture Products</h3>
        <br />
        <mdb-tbl v-for="picture in productPictures" :key="picture.id" btn responsive striped class="my-5 rounded-top border border-light border-bottom-0 ">
          <mdb-tbl-head class="tempting-azure-gradient">
            <tr>
              <th class="col-md-4">{{ picture.id }}</th>
              <th class="col-md-4">{{ picture.filename }}</th>
              <th class="col-md-4">{{ picture.UserId }} </th>
            </tr>
          </mdb-tbl-head>
          <mdb-tbl-body>

            <tr v-if="productPictures.length !== 0" scope="row">
              <td class="col-md-4" colspan="2">
                
                <router-link to="/test" class=""><mdb-btn color="success" class=" btn-sm">
                    <i class="fas fa-info-circle mr-2" aria-hidden="true"></i>Detail</mdb-btn>
                </router-link>
              </td>
              <td>
                <div class="input-group mb-3">
                    <div class="custom-file">
                    <input type="file" class="custom-file-input" id="uploader" aria-describedby="inputGroupFileAddon01">
                    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                    </div>
                </div>
              </td>
            </tr>
            
            <tr v-if="productPictures.length === 0" scope="row">
              <td colspan="2">
                No item here
              </td>
              <td>
                <div class="input-group mb-3">
                    <div class="custom-file">
                        
                        <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                        </div>
                        <input :disabled="uploadDisabled" @change="fileHandler($event, picture.ProductId)" type="file" class="custom-file-input" id="uploader" accept="image/png, image/jpg, image/jpeg">
                        <label class="custom-file-label" for="uploader">{{ uploadLabel }}</label>
                    </div>
                </div>
              </td>
            </tr>
          
          </mdb-tbl-body>
        </mdb-tbl>
      </section>
    </mdb-row>
  </mdb-container>


  <!-- // --- // -->
 
 
      <mdb-modal :show="showAddModal" @close="showAddModal = false;clearAddForm()" cascade class="text-left">
      <form @submit.prevent="addProduct">
        <mdb-modal-header class="primary-color white-text">
            <h4 class="title"><mdb-icon icon="pencil-alt" /> Add Product </h4>
        </mdb-modal-header>
        <mdb-modal-body class="grey-text">
            <mdb-alert v-if="addHasError" color="danger" class="animated" v-bind:class="animatedClass">{{ addError }}</mdb-alert>
            
            <select class="browser-default custom-select" v-model="selectedCategory">
                <option selected disabled value="default">Select Category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id" @click="selectedCategoryName = category.name" >{{ category.name }}</option>
            </select>
            <mdb-input @change="addHasError = false" v-model="addName" size="sm" label="Name" group type="text" validate error="wrong" success="right"/>
            <mdb-input @change="addHasError = false" v-model="addPrice" size="sm" label="Price" group type="number" validate error="wrong" success="right"/>
            <mdb-input @change="addHasError = false" v-model="addStock" size="sm" label="Stock" group type="number" validate error="wrong" success="right"/>
        </mdb-modal-body>
        
        <mdb-modal-footer>
            <mdb-btn type="submit" class="col-sm-6 d-flex align-center mx-auto"><i class="fa fa-plus mr-2 pt-1 pl-5" aria-hidden="true"></i>Add</mdb-btn>
        </mdb-modal-footer>
      </form>
    </mdb-modal>
    <!-- // --- // -->
      <mdb-modal :show="showEditModal" @close="showEditModal = false" cascade class="text-left">
      <form @submit.prevent="editProduct">
        <mdb-modal-header class="primary-color white-text">
            <h4 class="title"><mdb-icon icon="pencil-alt" /> Edit item </h4>
        </mdb-modal-header>
        <mdb-modal-body class="grey-text">
            <mdb-alert v-if="editHasError" color="danger" class="animated" v-bind:class="animatedClass">{{ editError }}</mdb-alert>
            <mdb-alert v-if="editHasInfo" color="info" class="animated" v-bind:class="animatedClass">{{ editInfo }}</mdb-alert>
            
            <select class="browser-default custom-select" v-model="selectedCategory">
                <option selected disabled value="default">Select Category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id" >{{ category.name }}</option>
            </select>
            <mdb-input @change="editHasError = false" v-model="editName" size="sm" label="Name" group type="text" validate error="wrong" success="right"/>
            <mdb-input @change="editHasError = false" v-model="editPrice" size="sm" label="Price" group type="number" validate error="wrong" success="right"/>
            <mdb-input @change="editHasError = false" v-model="editStock" size="sm" label="Stock" group type="number" validate error="wrong" success="right"/>

        </mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn type="submit" class="col-sm-6 d-flex align-center mx-auto">Save Edit</mdb-btn>
        </mdb-modal-footer>
      </form>
    </mdb-modal>
    <!-- // --- // -->
    <mdb-modal :show="confirmDelete" @close="confirmDelete = false" size="sm" class="text-center" danger>
      <mdb-modal-header class="young-passion-gradient" center :close="false">
        <p class="heading">Are you sure?</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-icon icon="times" class="animated bounce mr-1" /> Deleting '{{ deleteName }}' from category
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn class="btn-sm" @click="deleteProduct" color="danger">Yes</mdb-btn>
        <mdb-btn class="btn-md" color="secondary" @click="confirmDelete=false">No</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <!-- // -- // -->
  </div>
</template>

<script>
import { 
  mdbAlert, 
  mdbContainer, 
  mdbRow, 
  mdbInput, 
  mdbBtn, 
  mdbTbl, 
  mdbTblHead, 
  mdbTblBody, 
  mdbModal, 
  mdbModalHeader,
  mdbModalBody, 
  mdbModalFooter,
  mdbIcon
  // mdbNavbarToggler, 
  } from 'mdbvue'
import Axios from 'axios'

export default {
  name: 'merchant',
  components : {
    mdbAlert,
    mdbContainer,
    mdbRow,
    mdbTbl, 
    mdbTblHead, 
    mdbTblBody , 
    mdbModal, 
    mdbModalHeader, 
    mdbModalBody, 
    mdbModalFooter,
    mdbInput, 
    mdbBtn,
    mdbIcon
    // mdbNavbarToggler
  },
  data () {
    return {
      animatedClass : ``,
      showEditModal : false,
      editHasError : '',
      editError : '',
      editHasInfo : '',
      editInfo : '',
      editName : '',
      editPrice : '',
      editStock : '',
      editId : 0,
      editIndex : 0,
      confirmDelete : false,
      deleteName : '',
      deleteId : 0,
      deleteIndex : 0,
      showAddModal : false,
      addHasError : '',
      addError : '',
      addName : '',
      addPrice : '',
      addStock : '',
      selectedCategory : 'default',
      selectedCategoryName : '',
      uploadDisabled : false,
      uploadLabel : 'Choose a File'
    }
  },
  methods : {
    fileHandler (event, ProductId){
        this.uploadDisabled = true
        this.uploadLabel = event.target.files[0].name
        let newdata = new FormData()
        let file = event.target.files[0]

        newdata.append('name',file.name)
        newdata.append('file',file)
        newdata.append('upload_preset', 'otnddjow')
        let axiosHead = {
            'Content-Type': `multipart/form-data;`,
        }
        
        Axios.post('https://api.cloudinary.com/v1_1/personal-learning-project/image/upload', newdata, axiosHead)
            .then((response) => {
            this.uploadDisabled = false
                console.log(response)
                this.uploadLabel = 'Choose a file'
                Axios.post('http://localhost:3000/pictures/add', {
                    filename : response.secure_url,
                    ProductId : ProductId
                })
            }).catch((error) => {
                console.log(error.response)
            });
    },
    clearAddForm(){
        this.addName = '',
        this.addPrice = '',
        this.addStock = '',
        this.selectedCategory = 'default'
    },
    openEdit(id, CategoryId, CategoryName, name, price, stock, index) {
      this.showEditModal = true
      this.editId = id
      this.selectedCategory = CategoryId
      this.editIndex = index
      this.editName = name
      this.editPrice = price
      this.editStock = stock
      this.selectedCategoryName = CategoryName
    },
    editProduct () {
      this.animatedClass = ``
      this.editHasError = false
      Axios.put('http://localhost:3000/products/edit', {
        id : this.editId,
        name : this.editName,
        price: this.editPrice,
        stock: this.editStock,
        CategoryId: this.selectedCategory,
      } , {
        headers : {
          cmsaccesstoken : localStorage.cmsaccesstoken
        } 
      })  .then( ({ data }) => {
            this.showEditModal = false
            this.products[this.editIndex] = {
                name : data.name,
                price: this.editPrice,
                stock: this.editStock,
                CategoryId: this.selectedCategory,
                Category : {
                    id : this.selectedCategory,
                    name : this.selectedCategoryName
                }
            }
            this.editName = ''
      } ) .catch ( err => {
            console.log(err)
            this.editHasError = true,
            this.animatedClass = `pulse`
            this.editError = err.response.data.error
            this.editName = ''
      })      
    },
    addProduct () {
      this.animatedClass = ``
      this.addHasError = false
    //   this.selectedCategoryName = CategoryName
      Axios.post('http://localhost:3000/products/add', {
        name : this.addName,
        price : this.addPrice,
        stock : this.addStock,
        CategoryId : this.selectedCategory
      } , {
        headers : {
          cmsaccesstoken : localStorage.cmsaccesstoken
        } 
      })  .then( ({ data }) => {
            console.log(data)
            this.showAddModal = false
            this.products.push({ 
                id : data.id, 
                Category : 
                    { 
                      id : this.selectedCategory, 
                      name : this.selectedCategoryName
                    }, 
                name : data.name, 
                price : data.price, 
                stock : data.stock, 
                CategoryId : data.CategoryId
            })
            this.clearAddForm()
            this.$store.dispatch('loadCategories')
      } ) .catch ( err => {
            this.addHasError = true,
            this.animatedClass = `pulse`
            this.addError = err.response.data.error
      })
    },
    openDelete(id, name, index) {
      this.confirmDelete = true
      this.deleteId = id
      this.deleteName = name
      this.deleteIndex = index
    },
    deleteProduct () {
      Axios.delete('http://localhost:3000/products/delete', 
      {
        data : { id : this.deleteId },
        headers : {
          cmsaccesstoken : localStorage.cmsaccesstoken
        }
      }).then( ({ data }) => {
          this.confirmDelete = false
          console.log(data)
          this.products.splice(this.deleteIndex, 1);
      }).catch ( err => {
          console.log(err.response)
      })
    }

  },
  computed : {
      products () {
          return this.$store.state.merchantProducts
      },
      categories () {
          return this.$store.state.categories
      },
      productPictures () {
          return this.$store.state.pictures
      }
  },
  created : function () {
      this.$store.dispatch('loadProductPictures')
      this.$store.dispatch('loadMerchantProduct')
      this.$store.dispatch('loadCategories')

  }
}
</script>

<style scoped>
</style>