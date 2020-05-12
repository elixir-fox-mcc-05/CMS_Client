<template>
  <div id="app">
    <div class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" id="brand" to="/">E-Store</router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/About">About</router-link>
            </li>
          </ul>
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          User
            </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <router-link class="dropdown-item" to="/cart">Cart</router-link>
          <a class="dropdown-item" href="#">Logout</a>
        </div>
      </div>
        </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content{
  margin-top: 50px;
}
.dropdown-menu{
  margin-left: -35px;
  width: fit-content;
}

#navbarDropdownMenuLink{
  color: white;
}

</style>
