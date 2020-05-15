<template>
  <div class="home">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/views/Login.vue'

export default {
  name: 'Home',
  components: {
    Login

  }
}
</script>
