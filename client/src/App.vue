<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'G-Ecommerce',
  created () {
    this.$toasted.register('my_app_error',
      (payload) => {
        return payload.message
      }, { duration: 1500, theme: 'bubble', type: 'error' }
    )

    this.$toasted.register('my_app_success',
      (payload) => {
        return payload.message
      }, { duration: 1500, theme: 'bubble', type: 'success' }
    )

    this.$toasted.register('my_app_info',
      (payload) => {
        return payload.message
      }, { duration: 1500, theme: 'bubble', type: 'info' }
    )
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
