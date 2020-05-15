<template>
  <div>
    <div v-if="errStatus">
      <el-alert title="Product Not Found" type="warning"></el-alert>
    </div>
    <h1>Find Product</h1>
    <el-button type="primary" icon="el-icon-edit" @click="addProductForm" circle></el-button><br>
    <small>Create New Product</small><br><br>
    <el-input placeholder="# Product's ID" v-model="id" clearable></el-input><br><br>
    <el-button type="primary submit" @click.prevent="getProduct">Submit</el-button><br><br>
    <signOut></signOut>
  </div>
</template>

<script>
import signOut from './NavDashboard'
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  data () {
    return {
      id: null
    }
  },
  computed: {
    errStatus () { return this.$store.state.errorStatus }
  },
  components: {
    signOut
  },
  methods: {
    addProductForm () {
      this.$router.push({ path: '/add-products' })
    },
    getProduct () {
      axios({
        method: 'GET',
        url: `http://localhost:3000/products/${this.id}`,
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          this.$router.push({ path: `/products/${this.id}` })
          this.$store.commit('SET_DETAIL_ITEM', data.product)
          this.$store.commit('SET_ERROR_STATUS', false)
        })
        .catch(_ => {
          this.$store.commit('SET_ERROR_MSG', 'Not Found')
          this.$store.commit('SET_ERROR_STATUS', true)
          setTimeout(() => {
            this.$store.commit('SET_ERROR_STATUS', false)
          }, 2000)
        })
    }
  }
}
</script>

<style>
</style>
