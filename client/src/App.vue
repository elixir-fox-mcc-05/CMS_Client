<template>
  <div id="app">
  <head>
  <link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
</head>
    <Header />
    <div id="nav">
    <section class="section">
     <div class="container">
      <div class="columns">
        <div class="column is-4">
            <Menu />
        </div>
        <div class="column">
            <router-view/>
        </div>
      </div>
    </div>
    </section>
    </div>

  </div>
</template>

<script>
import Menu from './components/layout/Menu'
import Header from './components/layout/Header'
export default {
  name: 'App',
  components: {
    Menu,
    Header
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
