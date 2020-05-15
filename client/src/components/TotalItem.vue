<template>
<div>
  <el-input-number v-model="num" :min="1" :max="10"></el-input-number><br><br>
  <el-button type="primary submit" @click="add">Add To Store</el-button>
  <el-button type="danger" icon="el-icon-delete" @click="deleteProduct" circle></el-button><br><br>
  <el-alert v-if="success" title="success alert" type="success" ></el-alert>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TotalItem',
  data () {
    return {
      num: 1,
      success: false
    }
  },
  computed: {
    detailItem () { return this.$store.state.detailItem }
  },
  methods: {
    add () {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/products/${this.detailItem.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          stock: this.detailItem.stock + this.num
        }
      })
        .then(updateProduct => {
          setTimeout(() => {
            this.success = true
          }, 2000)
          this.success = false
          this.num = 1
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct () {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/products/${this.detailItem.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(deleted => {
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
