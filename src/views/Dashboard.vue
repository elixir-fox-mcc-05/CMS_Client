<template>
  <div id="Dashboard">
    <div class="container-fluid">
        <div class="row">
          <div class="col-12 mx-auto px-2 mx-2 row" style="background-color:#FFE47C;">
            <div class="sideBar">
                <img src="..\assets\img\hop&lop_logo_1.png" style="max-width:100%;">
                <hr/>
                <h6> Content Management System</h6>
                <button type="button" class="btn btn-danger" @click="logout()" style="width:100%;">Logout</button>
            </div>
            <div class="px-2" style="width:80%; margin-left:20vw;display:flex; flex-direction:column; align-items:stretch;">
                <div style="width:100%; display:flex; justify-content:space-between; padding:10px;">
                  <h1><b>Current Inventory</b></h1>
                </div>
                <div style="display:flex; justify-content:space-between; width:100%; margin: 20px 0px 0px 0px;">
                    <div class="report-box">
                        <p><b>Categories</b></p>
                        <h3><b>{{totalCategory}}</b></h3>
                    </div>
                    <div class="verticalLine"></div>
                    <div class="report-box">
                        <p><b>Products</b></p>
                        <h3><b>{{allProducts.length}}</b></h3>
                    </div>
                    <div class="verticalLine"></div>
                    <div class="report-box">
                        <p><b>Out of stock</b></p>
                        <h3><b>{{totalOutOfStock}}</b></h3>
                    </div>
                    <div class="verticalLine"></div>
                    <div class="report-box">
                        <p><b>Total stocks</b></p>
                        <h3><b>{{totalAvailableItems}}</b></h3>
                    </div>
                </div>
                <router-link to="/addProduct"><button type="button" style="width: 100%; padding:10px; margin: 10px 0px 0px 0px; background-color: #0be881; border-radius: 5px; border: 2px black;"><b>+ Add a new product</b></button></router-link>
                <div class="row" style="width:100%; margin:10px 0px 0px 0px; padding:0px 15px; display:flex; border-radius: 5px; justify-content:flex-start; align-items:center; background-color:#FFEDA8;">
                    <p style="margin:10px; width:95px; text-align:left;"><b>Thumbnail</b></p>
                    <p style="width:22.5%; margin:5px; text-align:left;"><b>Name</b></p>
                    <p class="header-content"><b>Category</b></p>
                    <p class="header-content"><b>Stock</b></p>
                    <p class="header-content"><b>Price</b></p>
                    <p class="header-content"><b>Actions</b></p>
                </div>
                <div v-for="product in allProducts" :key="product.id" >
                  <ProductCard :product="product"></ProductCard>
                </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
  name: 'Dashboard',
  components: {
    ProductCard
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
      // Ubah status currentlyLoggedIn di store
      // Ingat pasangannya : commit - mutation, action - dispatch
      this.$store.commit('set_currentlyLoggedIn', false)
    }
  },
  computed: {
    allProducts () {
      return this.$store.state.allProducts
    },
    totalCategory () {
      return this.$store.state.allCategory.length
    },
    totalOutOfStock () {
      const allStockProducts = this.$store.state.allProducts
      let outOfStockCounter = 0
      for (let i = 0; i < allStockProducts.length; i++) {
        if (allStockProducts[i].stock === 0) {
          outOfStockCounter += 1
        }
      }
      return outOfStockCounter
    },
    totalAvailableItems () {
      const allStockProducts = this.$store.state.allProducts
      let totalAvailableItems = 0
      for (let i = 0; i < allStockProducts.length; i++) {
        totalAvailableItems += allStockProducts[i].stock
      }
      return totalAvailableItems
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('set_currentlyLoggedIn', true)
      this.$store.dispatch('fetchAllProducts')
    } else {
      this.$store.commit('set_currentlyLoggedIn', true)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

h3{
    color:#ffa801;
}

.sideBar{
    width:20%;
    background-color:#FFFAE7;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding-top: 20px;
    padding:20px;
}

.report-box{
    width:23%;
    display: flex;
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.verticalLine{
    width:2px;
    height:auto;
    background-color:#ffc048;
    border-radius: 5px;
}

.header-content{
  width:115px;
  margin:5px;
  display:flex;
  align-items: center;
  text-align: left;
}

</style>
