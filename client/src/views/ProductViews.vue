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
                                <label for="exampleFormControlSelect1">Select Product Category</label>
                                <select class="form-control" id="exampleFormControlSelect1" v-model="productForm.category_id">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button> 
                            <button type="button" class="btn btn-danger" @click.prevent="cancelBtn">Cancel</button>
                        </form>
                    </div>
                    
                    <div class="table-responsive" v-if="!addBtn">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Stock</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
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
                                    <td>{{ product.category_id }}</td>
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
            addBtn: false,
            productForm : {
                name : '',
                description : '',
                price : '',
                stock : '',
                imgUrl : '',
                category_id : '',
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
            Axios({
                method: 'post',
                url: this.baseUrl+'/product',
                data: {
                    name,description,price,stock,imgUrl,category_id
                }
            })
            .then(result=>{
                this.addSuc = ''
                this.addErr = ''
                this.productForm.name = '',
                this.productForm.description = '',
                this.productForm.price = '',
                this.productForm.stock = '',
                this.productForm.imgUrl = '',
                this.productForm.category_id = ''
                this.addSuc = 'Succesfully adding product'
            })
            .catch(err=>{
                this.addSuc = ''
                this.addErr = ''
                this.addErr = err.response.data.msg
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
        }
    },
    created(){
        this.baseUrl = this.$store.state.baseUrl
        this.products = this.$store.state.product
        this.$store.commit('GET_PRODUCT')
    }
}
</script>

<style>
#addProduct button {
    margin-right:15px ;
}

</style>