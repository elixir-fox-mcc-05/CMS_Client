<template>
<div>
      <div class="sidenav">
        <router-link to="/home/category/tablecategory">Dashboard</router-link>
        <router-link to="/home/stock/tabelstock">Stock</router-link>
         <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
        <button @click.prevent="logout">Log Out</button>
      </div>
      <dir class="main">
        <router-view></router-view>
      </dir>
    </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

body {
  font-family: "Lato", sans-serif;
}

.sidenav {
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(211, 201, 201);
  overflow-x: hidden;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
}

.sidenav router-link {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #291c1c;
}

.sidenav router-link:hover {
  color: #f1f1f1;
}

.main {
  margin-left: 160px; /* Same as the width of the sidenav */
  font-size: 12px; /* Increased text to enable scrolling */
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav router-link {font-size: 18px;}
}
</style>
