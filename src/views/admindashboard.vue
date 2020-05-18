<template>
  <v-app class="black" style="color:white" v-if="isLogin">
    <b-col class="middle">
      <v-container>
        <v-card>
          <Category></Category>
        </v-card>
      </v-container>
      <v-container>
        <v-card style="padding-top:15px">
          <Product></Product>
        </v-card>
      </v-container>
    </b-col>
  </v-app>
</template>

<script>
import Category from '@/components/category'
import Product from '@/components/products'
export default {
  name: 'adminDashboard',
  data () {
    return {
      name: '',
      showAddForm: false
    }
  },
  components: {
    Category, Product
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  create () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN', true)
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    addForm () {
      switch (this.showAddForm) {
        case true :
          this.showAddForm = false
          break
        case false :
          this.showAddForm = true
          break
      }
    }
  }
}
</script>

<style scoped>
  .nav-items {
    padding: 5px;
  }
</style>
