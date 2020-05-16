<template>
  <div class="home">
    <mdb-navbar 
      style="z-index: 10" 
      expand="large" 
      dark 
      color="blue-gradient"
      id="main-navbar"
      position="top"
      scrolling
      :scrollingOffset="20"
    >
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item to="/"><mdb-icon regular icon="paper-plane" class="mx-2"/>Home</mdb-nav-item>
          <mdb-nav-item to="/index"><i class="fa fa-indent mr-2" aria-hidden="true"></i>Categories</mdb-nav-item>
          <mdb-nav-item to=""><i class="fa fa-person-booth mr-2" aria-hidden="true"></i>Products</mdb-nav-item>
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <mdb-nav-item v-if="isLoggedIn"><mdb-icon regular icon="smile" class="mx-2"/>Welcome, {{$store.state.userInfo.name}}</mdb-nav-item>
          <mdb-nav-item v-if="$store.state.userInfo.role === 'admin'" to="/admin"><i class="fa fa-user-shield mr-2" aria-hidden="true"></i>Admin Homepage</mdb-nav-item>
          <mdb-nav-item v-if="$store.state.userInfo.role === 'merchant'" to="/merchant"><i class="fa fa-store-alt mr-2" aria-hidden="true"></i>Your Store Homepage</mdb-nav-item>
          <mdb-nav-item v-if="$store.state.userInfo.role === 'customer'"><i class="fas fa-cart-plus mr-2" aria-hidden="true"></i> Cart</mdb-nav-item>
          <mdb-nav-item v-if="!isLoggedIn" @click="$store.commit(`showLoginModal`);loginHasError=false;$store.commit(`hideInfoLogin`)"><i class="fa fa-sign-out-alt mr-2" aria-hidden="true"></i>Login</mdb-nav-item>
          <mdb-nav-item v-if="!isLoggedIn" to="/register"><i class="fa fa-signature mr-2" aria-hidden="true"></i>Register</mdb-nav-item>
          <mdb-nav-item v-if="isLoggedIn" to="/logout"><i class="fa fa-power-off mr-2" aria-hidden="true"></i>Logout</mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    
    <!-- //// -->

    <mdb-modal :show="showModal" @close="$store.commit(`hideLoginModal`);$store.commit(`hideInfoLogin`);$store.commit(`setLoginEmail`,'');userPassword='';" cascade class="text-left">
      <form @submit.prevent="login">
        <mdb-modal-header class="primary-color white-text">
            <h4 class="title"><mdb-icon icon="pencil-alt" /> Login</h4>
        </mdb-modal-header>
        <mdb-modal-body class="grey-text">
            <mdb-alert v-if="loginHasError" color="danger" class="animated" v-bind:class="animatedClass">{{ loginError }}</mdb-alert>
            <mdb-alert v-if="loginHasInfo" color="info" class="animated" v-bind:class="animatedClass">{{ loginInfo }}</mdb-alert>
            <mdb-input v-model="userEmail" size="sm" label="Your email" icon="user" group type="email" validate error="wrong" success="right"/>
            <mdb-input v-model="userPassword" size="sm" label="Password" icon="lock" group :type="passwordType" validate error="wrong" success="right">
              <mdb-btn title="show / hide password" @click="toggleLoginModal">
              <mdb-icon :icon="loginModalIcon" />
              </mdb-btn>
            </mdb-input>
        </mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn type="submit" class="col-sm-12">Continue</mdb-btn>
        </mdb-modal-footer>
      </form>
    </mdb-modal>
    <!-- //// -->
    <!-- //// -->
  </div>
</template>

<script>
import axios from 'axios'

import {
  mdbAlert,
  mdbIcon,
  mdbNavbar,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbInput, 
  mdbBtn, 
  mdbModal, 
  mdbModalHeader, 
  mdbModalBody, 
  mdbModalFooter
} from "mdbvue";

export default {
  name: 'navbar',
  components: {
    mdbAlert,
    mdbIcon,
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbInput,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalBody,
    mdbModalFooter
  },
  data() {
    return {
      passwordType : `password`,
      loginHasError : false,
      loginError : ``,
      userPassword : ``,
      animatedClass: ``,
      loginModalIcon : `eye-slash`
    }
  },
  computed: {
    userEmail : {
      get: function () {
        return this.$store.state.loginEmail
      },
      set: function (newValue) {
        this.$store.commit('setLoginEmail', newValue)
      }
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    },
    showModal(){
      return this.$store.state.loginModal
    },
    loginHasInfo () {
      return this.$store.state.loginHasInfo
    },
    loginInfo () {
      return this.$store.state.loginInfo
    }
  },
  methods : {
    showLogin(){
      this.showModal = true, 
      this.userPassword = ``, 
      this.loginHasError = false
    },
    login() {
      this.animatedClass = ``
      this.loginHasError = false
      this.$store.commit(`hideInfoLogin`)
      console.log(this.userEmail)
      axios({
        method : 'post',
        url : 'http://localhost:3000/users/login',
        data : {
          email : this.userEmail,
          password : this.userPassword
        },
      })  .then( result => {
            this.$store.commit(`setLoginEmail`, '')
            this.userPassword = ``;
            this.loginHasError = false,
            this.$store.commit(`hideLoginModal`)
            localStorage.setItem(`cmsaccesstoken`, result.data.cmsaccesstoken)
            this.$store.commit(`SetIsLogin`, true)
            this.$store.commit(`setInfo`, this.$jwt.decode(localStorage.cmsaccesstoken,`handycuttyspicy`))
            if(this.$store.state.userInfo.role === 'admin') {
              this.$router.push(`/admin`)
            } else if(this.$store.state.userInfo.role === 'merchant') {
              this.$router.push(`/merchant`)
            } else {
              this.$router.push(`/`)
            }
      })  .catch( err => {
            this.loginHasError = true,
            this.animatedClass = `pulse`
            this.loginError = err.response.data.error
      })
    },
    toggleLoginModal() {
      this.passwordType == 'text' ? this.passwordType = 'password' : this.passwordType = 'text'
      this.loginModalIcon == 'eye-slash' ? this.loginModalIcon = 'eye' : this.loginModalIcon = 'eye-slash'
    }
  }
}
</script>
