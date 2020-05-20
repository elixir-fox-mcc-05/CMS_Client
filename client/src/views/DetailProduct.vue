<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h1>Detail Product</h1>
        <form>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
                </div>
            </div>
            <div class="form-group row">
                 <div class="col">
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </form>
        <button type="button" @click="cancel" class="btn btn-warning">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'DetailProduct',
  data () {
    return {
      product: this.$route.params.productId
    }
  },
  methods: {
    ...mapMutations(['SET_LOGIN']),
    cancel () {
      this.$router.push('/mainPage')
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push('/')
      this.SET_LOGIN(false)
    } else {
      this.SET_LOGIN(true)
    }
  }
}
</script>

<style>
</style>
