<template>
  <div id="app">
    <div id="nav">
      <div id="Logo">
        <p>Bukalipik</p>
      </div>
      <router-link class="nav-name" to="/">Home</router-link>
      <router-link class="nav-name" to="/login">Login</router-link>
      <router-link class="nav-name" to="/register">Register</router-link>
      <router-link class="nav-name" to="/dashboard">Dashboard</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#Logo {
  font-weight: bold;
  font-size: 26px;
  color: #ff6161;
  margin-right: 20px;
}

.nav-name {
  margin: 0 20px 0;
  text-decoration: none;
}

#nav {
  padding: 10px 50px 10px;
  background: white;
  display: flex;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color: #909090;
}

#nav a.router-link-exact-active {
  color: #2096f3;
}
</style>
