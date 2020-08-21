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
                        <div class="input-group-prepend col-8">
                            <button class="btn btn-outline-secondary dropdown-toggle btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                            >Filter by Category</button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item"
                                @click.prevent="showAllProduct"
                                >
                                    All
                                </a>
                                <a class="dropdown-item"
                                @click.prevent="filterBtn(-1)"
                                >
                                    Uncategory
                                </a>
                                <a class="dropdown-item" 
                                v-for="(cat,i) in category" :key="i"
                                @click.prevent="filterBtn(cat.id)"
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
                    <!-- show product -->     
                    <div class="table-responsive"
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
                            <!-- show All -->
                            <tbody v-if="!filter">
                                <ProductList
                                    v-for="product in products"
                                    :key="product.id"
                                    :product="product"
                                ></ProductList>
                            </tbody>
                            <!-- filter arr -->
                            <tbody v-else>
                                <ProductList
                                    v-for="product in products"
                                    :key="product.id"
                                    :product="product"
                                ></ProductList>
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
import ProductList from '../components/ProductList'
import Server from '../api'

export default {
    name: 'product',
    data () {
        return {
            baseUrl : '',
            filter: '',
            addBtn: false,
            sortBy: '',
            selCatName: '',
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
        topNavbar,
        ProductList
    },
    computed: {
        products () {
            let newProd = []
            if (!this.filter) {
                this.$store.state.product.forEach(element => {
                    let {id, name, description, price, stock, imgUrl, category_id } = element
                    if (element.category_id === 0 || element.category_id === null) {
                        newProd.push({
                            id, name, description, price, stock, imgUrl, category_id,
                            category_name : "uncategory"
                        })
                    } else {
                        this.$store.state.category.forEach(el => {
                            if (category_id === el.id) {
                                newProd.push({
                                    id, name, description, price, stock, imgUrl, category_id,
                                    category_name : el.name
                                })
                            }
                        });
                    }
                });
            } else {
                this.$store.state.product.forEach(element => {
                    if (element.category_id === this.filter) {
                        let {id, name, description, price, stock, imgUrl, category_id } = element
                        if (element.category_id === -1) {
                            newProd.push({
                                id, name, description, price, stock, imgUrl, category_id,
                                category_name : "uncategory"
                            })
                        } else {
                            this.$store.state.category.forEach(el => {
                                if (category_id === el.id) {
                                    newProd.push({
                                        id, name, description, price, stock, imgUrl, category_id,
                                        category_name : el.name
                                    })
                                }
                            });
                        }
                    }
                });
            }
            return newProd
        },
        category () {
            return this.$store.state.category
        }
    },
    methods: {
        addProductBtn() {
            if(!this.addBtn) {
                this.addBtn = true
            } else {
                this.addBtn = false
            }
        },
        addProductSubmit() {
            let { name,description,price,stock,imgUrl,category_id } = this.productForm
            Server({
                method: 'post',
                url: '/product',
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
                this.$store.dispatch('getProduct')
            })
            .catch(err=>{
                this.addSuc = ''
                this.addErr = ''
                this.addErr = err.response.data.msg
            })
        },
        addCat() {
            Server({
                method: 'post',
                url: '/category',
                data: {
                    name: this.categoryForm.name
                }
            })
            .then(result=>{
                this.$store.dispatch('getCategory')
                console.log(result)
                this.categoryForm.name = ''
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
        showAllProduct() {
            this.filter = ''
        },
        filterBtn (id) {
            this.filter = id
            console.log(id)
        },
        selectCatAddProd(id,name) {
            this.productForm.category_id = id
            this.selCatName = name
        }
    },
    watch: {
    },
    created(){
        this.$store.dispatch('getProduct')
        this.$store.dispatch('getCategory')
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