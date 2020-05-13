<template>
  <div id="app" style="display:flex; flex-direction:column; padding-left:5px">
    <div id="nav" class="d-flex justify-content-between">
      <div class="d-flex">
        <div class="main-nav">
          <router-link to="/">Home</router-link>
        </div>
        <div class="main-nav">
          <router-link to="/login">Login</router-link>
        </div>
        <div class="main-nav">
          <router-link to="/register">Register</router-link>
        </div>
      </div>
      <div>
        <b-button variant="outline-info" class="mb-2">
          <b-icon icon="power" aria-hidden="true"></b-icon> Logout
        </b-button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .main-nav {
    padding: 5px;
  }
</style>
