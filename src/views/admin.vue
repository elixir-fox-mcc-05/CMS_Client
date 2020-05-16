<template>
  <div class="home">
    <mdb-container class="mt-5" id="categoriesTable">
        <mdb-navbar color="info" class="lighten-4">
          <mdb-navbar-nav nav center>
            <mdb-nav-item href="#categoriesTable" class="bg-light btn btn-sm mr-4">Categories</mdb-nav-item>
            <mdb-nav-item href="#productsTable" class="bg-light btn btn-sm mr-4">Products</mdb-nav-item>
          </mdb-navbar-nav>
        </mdb-navbar>
    </mdb-container>

  <mdb-container class="mt-5" id="categoriesTable">
    <mdb-row class="mt-5 align-items-left justify-content-start">
      <section class="col-md-12">
        <h3>All Categories</h3>
        <br />
        <mdb-btn @click="showAddModal = true; addHasError = false" color="primary" class="m-0"><i class="fas fa-book mr-2" aria-hidden="true"></i>Add New</mdb-btn>
        <br />
        <mdb-tbl btn responsive striped class="my-5 rounded-top border border-light border-bottom-0 ">
          <mdb-tbl-head class="tempting-azure-gradient">
            <tr>
              <th>No</th>
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </mdb-tbl-head>
          <mdb-tbl-body>

            <tr v-for="(category, index) in categories" :key="category.id" scope="row" class="">
              <td>{{ index+1 }}</td>
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>
                <mdb-btn @click="openEdit(category.id, category.name, index)" color="info" class=" btn-sm"><i class="fas fa-pencil-alt mr-2" aria-hidden="true"></i>Edit</mdb-btn> 
                <mdb-btn @click="openDelete(category.id, category.name, index)" color="danger" class=" btn-sm"><i class="fas fa-trash mr-2" aria-hidden="true"></i> Delete</mdb-btn>
              </td>
            </tr>
            
            <tr v-if="categories.length === 0" scope="row">
              <td colspan="4">
                No item here
              </td>
            </tr>
          
          </mdb-tbl-body>
        </mdb-tbl>
      </section>
    </mdb-row>
    <mdb-row class="mt-4">
      <section>
        
      </section>
    </mdb-row>
  </mdb-container>
  <!-- // --- // -->
      <mdb-modal :show="showAddModal" @close="showAddModal = false" cascade class="text-left">
      <form @submit.prevent="addCategory">
        <mdb-modal-header class="primary-color white-text">
            <h4 class="title"><mdb-icon icon="pencil-alt" /> Add Category </h4>
        </mdb-modal-header>
        <mdb-modal-body class="grey-text">
            <mdb-alert v-if="addHasError" color="danger" class="animated" v-bind:class="animatedClass">{{ addError }}</mdb-alert>
            <mdb-input v-model="addName" size="sm" label="Category Name" icon="folder" group type="text" validate error="wrong" success="right"/>
        </mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn type="submit" class="col-sm-6 d-flex align-center mx-auto">Add</mdb-btn>
        </mdb-modal-footer>
      </form>
    </mdb-modal>
    <!-- // --- // -->
      <mdb-modal :show="showEditModal" @close="showEditModal = false" cascade class="text-left">
      <form @submit.prevent="editCategory">
        <mdb-modal-header class="primary-color white-text">
            <h4 class="title"><mdb-icon icon="pencil-alt" /> Edit item </h4>
        </mdb-modal-header>
        <mdb-modal-body class="grey-text">
            <mdb-alert v-if="editHasError" color="danger" class="animated" v-bind:class="animatedClass">{{ editError }}</mdb-alert>
            <mdb-alert v-if="editHasInfo" color="info" class="animated" v-bind:class="animatedClass">{{ editInfo }}</mdb-alert>
            <mdb-input v-model="editName" size="sm" label="Category Name" icon="folder" group type="text" validate error="wrong" success="right"/>
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
        <mdb-btn class="btn-sm" color="danger" @click="deleteCategory">Yes</mdb-btn>
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
  mdbIcon, 
  mdbNavbar,
  mdbNavItem,
  mdbNavbarNav,
  // mdbNavbarToggler, 
  } from 'mdbvue'
import Axios from 'axios'

export default {
  name: 'admin',
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
    mdbIcon,
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
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
      categories : []
    }
  },
  methods : {
    openEdit(id, name, index) {
      this.showEditModal = true
      this.editId = id
      this.editIndex = index
      this.editName = name
    },
    editCategory () {
      this.animatedClass = ``
      this.editHasError = false
      Axios.put('https://afternoon-beyond-11115.herokuapp.com/categories/edit', {
        id : this.editId,
        name : this.editName
      } , {
        headers : {
          cmsaccesstoken : localStorage.cmsaccesstoken
        } 
      })  .then( ({ data }) => {
            console.log(data)
            this.showEditModal = false
            this.categories[this.editIndex].name = data.name
            this.editName = ''
      } ) .catch ( err => {
            this.editHasError = true,
            this.animatedClass = `pulse`
            this.editError = err.response.data.error
            this.editName = ''
      })      
    },
    addCategory () {
      if(!this.addName) {
        this.addHasError = true,
        this.animatedClass = `pulse`
        this.addError = 'Category name cannot be empty'
        return false
      }
      this.animatedClass = ``
      this.addHasError = false
      Axios.post('https://afternoon-beyond-11115.herokuapp.com/categories/add', {
        name : this.addName
      } , {
        headers : {
          cmsaccesstoken : localStorage.cmsaccesstoken
        } 
      })  .then( ({ data }) => {
            console.log(data)
            this.showAddModal = false
            this.categories.push({ id : data.id, name : data.name})
            this.categories.sort(function (a,b) {
              let x = a.name.toLowerCase()
              let y = b.name.toLowerCase()
              if(x < y) { return -1}
              if(x > y) { return 1}
              return 0
            })
            this.addName = ''
      } ) .catch ( err => {
            this.addHasError = true,
            this.animatedClass = `pulse`
            this.addError = err.response.data.error
            this.addName = ''
      })
    },
    openDelete(id, name, index) {
      this.confirmDelete = true
      this.deleteId = id
      this.deleteName = name
      this.deleteIndex = index
    },
    deleteCategory () {
      Axios.delete('https://afternoon-beyond-11115.herokuapp.com/categories/delete', 
      {
        data : { id : this.deleteId },
        headers : {
          cmsaccesstoken : localStorage.cmsaccesstoken
        }
      }).then( ({ data }) => {
          this.confirmDelete = false
          console.log(data)
          this.categories.splice(this.deleteIndex, 1);
      }).catch ( err => {
          console.log(err.response)
      })
    }
  },
  created : function() {
    if(this.$store.state.userInfo.role!=='admin') {
      this.$router.push('/')
    }
    Axios.get('https://afternoon-beyond-11115.herokuapp.com/categories')
          .then( ({ data }) => {
            console.log(data)
            this.categories = data.Category
            // console.log(data.result)
          })
          .catch( ( err ) => {
            console.log(err)
          })
  }
}
</script>
