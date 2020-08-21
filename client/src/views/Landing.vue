<template>
  <Login></Login>
</template>

<script>
import Login from '../components/Login'
export default {
    name: 'landing',
    components: {
        Login
    },
    created () {
        if(localStorage.getItem('token')) {
            this.$router.push('/products')
        }
    }
}
</script>

<style>

</style>