<template>
  <div>
        <topNavbar></topNavbar>
        <div class="container-fluid">
            <div class="row">
                <sidebarMenu></sidebarMenu>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 class="h2">Products</h1>
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click.prevent="addProductBtn">
                                Add Product
                            </button>
                        </div>
                    </div>

                    <div v-if="addBtn">
                        <div v-if="addSuc">
                            <div class="alert alert-success">
                                {{ addSuc }}
                            </div>
                        </div>
                        <div v-if="addErr">
                            <div class="alert alert-danger">
                                {{ addErr }}
                            </div>
                        </div>
                        <form id="addProduct" @submit.prevent="addProductSubmit">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Product Name" v-model="productForm.name">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Product Description" v-model="productForm.description">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" placeholder="Product Price" v-model="productForm.price">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" placeholder="Product Stock" v-model="productForm.stock">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Product Image Url/Link" v-model="productForm.imgUrl">
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" class="form-control" aria-label="Text input with dropdown button" :placeholder="selCatName" disabled>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                        v-if="category.length > 0"
                                        >Select Category</button>
                                        <div class="dropdown-menu">
                                            <a
                                            class="dropdown-item"
                                            @click.prevent="selectCatAddProd(0,'Uncategory')"
                                            > Uncategory </a>
                                            <a class="dropdown-item" 
                                            v-for="(cat,i) in category" :key="i"
                                            @click.prevent="selectCatAddProd(cat.id,cat.name)"
                                            >
                                                {{ cat.name }}
                                            </a>
                                        </div>
                                    </div>
                                </div>                
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button> 
                            <button type="button" class="btn btn-danger" @click.prevent="cancelBtn">Cancel</button>
                        </form>
                    </div>

                    <!-- end nav -->
                    
                    <div class="input-group row" v-if="!addBtn">
                        <div class="input-group-prepend col-9">
                            <button class="btn btn-outline-secondary dropdown-toggle btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                            v-if="category.length > 0"
                            >Filter by Category</button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item"
                                @click.prevent="showAllProduct"
                                >
                                    All
                                </a>
                                <a class="dropdown-item"
                                @click.prevent="sortByCategory(0)"
                                >
                                    Uncategory
                                </a>
                                <a class="dropdown-item" 
                                v-for="(cat,i) in category" :key="i"
                                @click.prevent="sortByCategory(cat.id)"
                                >
                                    {{ cat.name }}
                                </a>
                            </div>
                        </div>
                        <form @submit.prevent="addCat">
                            <div class="form-row align-items-center">
                                <div class="col-auto">
                                    <label class="sr-only" for="inlineFormInput">Name</label>
                                    <input type="text" class="form-control" v-model="categoryForm.name" placeholder="Add New Category">
                                </div>
                                <div class="col-auto">
                                    <button type="submit" class="btn btn-outline-secondary">Add</button>
                                </div>
                            </div>
                        </form>
                    </div> <br>
                    
                    <!-- show by category -->
                    <div class="table-responsive"
                    v-if="!addBtn && seletedCategory || seletedCategory === 0"
                    >
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Stock</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product,i) in sortByCat" :key="i">
                                    <td>
                                        <img :src="product.imgUrl" :alt="product.title" width="100px" height="100px">
                                    </td>
                                    <td>{{ product.stock }}</td>
                                    <td>{{ product.name }}</td>
                                    <td>Rp.{{ convertToRp(product.price) }}</td>
                                    <td>{{ showCatName }}</td>
                                    <td>
                                        <button class="btn btn-warning btn-sm btn-block">Edit</button>
                                        <button class="btn btn-danger btn-sm btn-block">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- show all -->
                    <div class="table-responsive" 
                    v-else
                    >
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Stock</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product,i) in products" :key="i">
                                    <td>
                                        <img :src="product.imgUrl" :alt="product.title" width="100px" height="100px">
                                    </td>
                                    <td>{{ product.stock }}</td>
                                    <td>{{ product.name }}</td>
                                    <td>Rp.{{ convertToRp(product.price) }}</td>
                                    s
                                    <td>
                                        <button class="btn btn-warning btn-sm btn-block">Edit</button>
                                        <button class="btn btn-danger btn-sm btn-block">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </main>
            </div>
        </div>
  </div>
</template>

<script>
import sidebarMenu from '../components/Navbar'
import topNavbar from '../components/topNavbar'
import convertToRp from '../script/convertToRp.js'
import Axios from 'axios'
export default {
    name: 'product',
    data () {
        return {
            baseUrl : '',
            products: [],
            category: [],
            addBtn: false,
            seletedCategory: '',
            selCatName: '',
            sortByCat: [],
            showCatName: '',
            productForm: {
                name : '',
                description : '',
                price : '',
                stock : '',
                imgUrl : '',
                category_id : '',
            },
            categoryForm: {
                name: ''
            },
            addSuc: '',
            addErr: '',
        }
    },
    components: {
        sidebarMenu,
        topNavbar
    },
    computed: {
    },
    methods: {
        convertToRp(price) {
            return convertToRp(price)
        },
        addProductBtn() {
            if(!this.addBtn) {
                this.addBtn = true
            } else {
                this.addBtn = false
            }
        },
        addProductSubmit() {
            let { name,description,price,stock,imgUrl,category_id } = this.productForm
            console.log(this.productForm)
            // Axios({
            //     method: 'post',
            //     url: this.baseUrl+'/product',
            //     data: {
            //         name,description,price,stock,imgUrl,category_id
            //     }
            // })
            // .then(result=>{
            //     this.addSuc = ''
            //     this.addErr = ''
            //     this.productForm.name = '',
            //     this.productForm.description = '',
            //     this.productForm.price = '',
            //     this.productForm.stock = '',
            //     this.productForm.imgUrl = '',
            //     this.productForm.category_id = ''
            //     this.addSuc = 'Succesfully adding product'
            // })
            // .catch(err=>{
            //     this.addSuc = ''
            //     this.addErr = ''
            //     this.addErr = err.response.data.msg
            // })
        },
        addCat() {
            Axios({
                method: 'post',
                url: this.baseUrl+'/category',
                data: {
                    name: this.categoryForm.name
                }
            })
            .then(result=>{
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        cancelBtn(){
            this.addBtn = false
            let { name,description,price,stock,imgUrl,category_id } = this.productForm
            name = '',
            description = '',
            price = '',
            stock = '',
            imgUrl = '',
            category_id = ''
        },
        sortByCategory(id) {
            this.seletedCategory = id
            let newCat = []
            this.$store.state.product.forEach(elem => {
                if (elem.category_id === id) {
                    newCat.push(elem)
                }
            });
            this.sortByCat = newCat
            this.getCatName(id)
            console.log(this.sortByCat,this.seletedCategory)
        },
        showAllProduct() {
            this.seletedCategory = ''
        },
        selectCatAddProd(id,name) {
            this.productForm.category_id = id
            this.selCatName = name
        },
        getCatName(id) {
            if (id === 0) {
                    this.showCatName = 'Uncategory'
            } else {
                this.$store.state.category.forEach(el => {
                    if( id === el.id) {
                        console.log(el.name)
                        this.showCatName = el.name
                    }
                });
            }
        }
    },
    created(){
        this.baseUrl = this.$store.state.baseUrl
        this.products = this.$store.state.product
        this.category = this.$store.state.category
        this.$store.commit('GET_PRODUCT')
        this.$store.commit('GET_CATEGORY')
    }
}
</script>

<style>
#addProduct button {
    margin-right:15px ;
}

tbody tr {
    box-shadow: none;
    animation: 1s;
}

tbody tr:hover {
    box-shadow: -1px 0px 14px -9px rgba(0,0,0,0.75);
}

</style>