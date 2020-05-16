<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Landing Page</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/main">Main Page</router-link>|
      <router-link to="/detail">Detail Page</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  padding: 0;
  margin: 0;
  font-size: 14px;
  background-color: #f4f4f4;
  height: 100vh;
}

</style>
