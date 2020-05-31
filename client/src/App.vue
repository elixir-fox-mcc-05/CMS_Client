<template>
  <div id="app">
    <div v-if="!isLogin" id="nav" class="sticky">
      <div id="Logo">
        <p>Bukalipik</p>
      </div>
      <router-link class="nav-name" to="/">Login</router-link>
      <router-link class="nav-name" to="/register">Register</router-link>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>

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
  padding: 10px 100px 10px;
  background: white;
  display: flex;
  align-items: center;
  position: sticky;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: #909090;
}

#nav a.router-link-exact-active {
  color: #2096f3;
  border-bottom: 1px solid #2096f3;
  padding-bottom: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.5s;
}

.fade-enter-active {
  transition-delay: 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
