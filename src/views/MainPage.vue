<template>
    <div>
      <div class="mainPage page">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-mainPage sticky-top">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <a class="navbar-brand nav-link"> Winter </a>
                    <div class="navbar-nav right">
                        <a class="nav-link" @click="logout"> Logout </a>
                        <!-- <button @click="logout">Logout</button> -->
                    </div>
                </div>
            </nav>
            <!-- New Brand -->
            <!-- <NewProduct/> -->
            <!-- End New Brand -->

            <!-- Show Product -->
            <div class="col-8">
              <div class="row">
                <div class="col-sm">
                  <products v-for="$product in products" :key="$product.id" :product="$product"/>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import products from '../components/products'
export default {
  name: 'MainPage',
  components: {
    products
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'LandingPage' })
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'LandingPage' })
    } else {
      axios({
        method: 'get',
        url: 'https://pacific-scrubland-26922.herokuapp.com/products',
        headers: {
          access_token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.products = data.result
          console.log(this.products)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.navbar-mainPage{
  padding: 0 60px;
}

a {
  cursor: pointer;
}
</style>
