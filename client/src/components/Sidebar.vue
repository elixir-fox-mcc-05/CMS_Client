<template>
  <div class="sidenav">
    <router-link :to="'/dashboard/products'" >Products</router-link>
    <router-link :to="'/dashboard/categories'" v-if="userRole == 'admin'">Category</router-link>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  computed: {
    userRole () {
      return this.$store.state.userRole
    }
  }
}
</script>

<style>
.sidenav {
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 0;
  margin-top: 50px;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  color: #818181;
  display: block;
}

.sidenav a:hover {
  color: #f1f1f1;
}
.sidenav a:hover,
.sidenav a.router-link-active,
.sidenav a.router-link-exact-active {
   background-color: grey;
   color: #f1f1f1;
   cursor: pointer;
 }

</style>
