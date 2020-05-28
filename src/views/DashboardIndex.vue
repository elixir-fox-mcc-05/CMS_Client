<template>
  <div>
    <div id="content-nav" class="d-flex flex-wrap justify-content-center">
      <router-link to="/dashboard"><b-button pill variant="outline-dark">Home</b-button></router-link>
      <router-link to="/dashboard/products"><b-button pill variant="outline-dark">Products</b-button></router-link>
      <router-link to="/dashboard/users"><b-button pill variant="outline-dark">Users</b-button></router-link>
      <router-link to="/dashboard/help"><b-button pill variant="outline-dark">Help</b-button></router-link>
    </div>
    <br />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'DashboardIndex'
}
</script>

<style></style>
