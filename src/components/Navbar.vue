<template>
<nav class="navbar fixed-top navbar-expand-lg navbar-dark" id="navbar">
  <div class="dropdown">
    <a href="#" class="dropbtn"><span class="glyphicon glyphicon-list" id="logo"></span></a>
    <div class="dropdown-content">
      <h4 style="margin-left: -50px;"><b>GENRES</b></h4>
      <a href="#" @click.prevent="findAll"><span class="glyphicon glyphicon-tag"></span> <b>All Genres</b></a>
      <a href="#" @click.prevent="findByGenre('Adventure')"><span class="glyphicon glyphicon-tag"></span> Adventure</a>
      <a href="#" @click.prevent="findByGenre('Horror')"><span class="glyphicon glyphicon-tag"></span> Horror</a>
      <a href="#" @click.prevent="findByGenre('RPG')"><span class="glyphicon glyphicon-tag"></span> RPG</a>
      <a href="#" @click.prevent="findByGenre('Simulation')"><span class="glyphicon glyphicon-tag"></span> Simulation</a>
    </div>
  </div>
  <div class="brand">
    <a class="navbar-brand" id="brand" href="#" @click.prevent="home">elixir</a>
  </div>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="home"><b>HOME</b> <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="checkout"><b>CHECKOUT</b> <span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
  <div class="icons row">
  <div class="dropdown" style="margin-right: 20px;">
    <a href="#" style="font-size:24px" class="usericon"><i class="material-icons" id="user-btn">shopping_cart</i></a>
    <div class="dropdown-content-cart">
      <a href="#"  @click.prevent="cart"><b>MY CART</b></a>
      <a href="#"  @click.prevent="checkout"><b>CHECKOUT LIST</b></a>
    </div>
  </div>
    <div class="dropdown-user">
    <a href="#" style="font-size:24px" class="usericon"><i class="material-icons" id="user-btn">person</i></a>
      <div class="dropdown-content-user">
      <a href="#" v-if="!logged" @click.prevent="login"><b>LOGIN</b></a>
      <a href="#" v-if="!logged" @click.prevent="register"><b>REGISTER</b></a>
      <a href="#" v-if="logged" @click.prevent="logout"><b>LOGOUT</b></a>
    </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',

  computed: {
    logged () {
      return this.$store.state.logged
    }
  },
  data () {
    return {
      isLogin: false
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.dispatch('loggedIn')
      this.isLogin = this.logged
    } else {
      this.isLogin = false
    }
  },
  methods: {
    login () {
      this.$store.dispatch('openLogin')
    },
    register () {
      this.$store.dispatch('openRegister')
    },
    home () {
      this.$router.push({
        name: 'home'
      })
    },
    checkout () {
      if (localStorage.access_token) {
        this.$router.push('/checkoutlist')
      } else {
        this.$store.dispatch('openLogin')
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'info',
            title: 'You need to Login first'
          })
      }
    },
    cart () {
      if (localStorage.access_token) {
        this.$router.push('/cart')
      } else {
        this.$store.dispatch('openLogin')
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'info',
            title: 'You need to Login first'
          })
      }
    },
    logout () {
        this.$store.dispatch('loggedOut')
        localStorage.clear()
        if (this.$router.currentRoute.path !=='/') {
          this.$router.push({
          name: 'home'
        })
        }
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Logged Out successfully'
          })
      
    },
    findByGenre (text) {
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push({
          name: 'home'
        })
      }
      this.$store.dispatch('findByGenre', text)
    },
    findAll () {
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push({
          name: 'home'
        })
      }
      this.$store.dispatch('getProducts')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative&display=swap');

#brand {
  font-size: 32px;
  font-family: 'Cinzel Decorative', cursive;
}

#navbar {
  margin-top: 25px;
  position: fixed;
}

.glyphicon.glyphicon-list {
  /* font-size: 25px; */
  margin-top: -2px;
  margin-right: -1px;
}

/* Style The Dropdown Button */
.dropbtn {
  background-color: rgb(255, 255, 255);
  padding: 10px;
  color: rgb(0, 0, 0);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-left: 30px;
  margin-top: -5px;
  border-radius: 50px;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-user{
  margin-right: 25px;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content-user {
  display: none;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  width: 90px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-right: 20px;
}

.dropdown-content-cart {
  display: none;
  position: absolute;
    background-color: rgba(255, 255, 255, 0.7);
  /* min-width: 160px; */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content-user a {
  color: black;
  padding: 10px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content-cart a {
  color: black;
  padding: 10px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: rgb(51, 153, 51);
}

.dropdown-content-user a:hover {
  background-color: rgb(51, 153, 51);
}

.dropdown-content-cart a:hover {
  background-color: rgb(51, 153, 51);
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-user:hover .dropdown-content-user{
  display: block;
}

.dropdown:hover .dropdown-content-cart{
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #000000;
  color: rgb(255, 255, 255);
}

.usericon {
  background-color: rgb(255, 255, 255);
  padding: 5px;
  color: black;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: -5px;
  border-radius: 50px;
  width: 35px;
}

.usericon:hover {
  background: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  text-decoration: none;
}

.icons {
  margin-right: 25px;
}

#navbarNav a {
  color: white;
}

#navbarNav a:hover {
  color: orangered;
}

.navbar-brand:hover {
  color: orangered;
}

#user-dropwdown{
  margin-right: 50px;
}

</style>
