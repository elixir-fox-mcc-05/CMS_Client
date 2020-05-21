<template>
  <div class="loginPage">
    <div class="container">
      <h1>Welcome to The Greatest Ecommerce Ever, Bukalipik</h1>
      <p class="label">Please insert your email and password, to login</p>
      <Notif class="notif" />
      <Error class="error" />
      <input
        v-model="email"
        class="username"
        type="text"
        placeholder="Enter your email"
      />
      <input
        v-model="password"
        class="username"
        :type="passwordFieldType"
        placeholder="Enter your password"
      />
      <button @click.prevent="login">Login</button>
      <p class="register">
        don't have an account?
        <a @click.prevent="register" href="">register here </a>
      </p>
      <div class="eyeToggle">
        <a
          href=""
          @click.prevent="switchVisibility"
          rel="tooltip"
          data-animate="animated fadeIn"
          data-original-title=""
          data-toggle="tooltip"
          data-placement="bottom"
        >
          <i class="fa fa-eye" v-if="!isShowing"></i>
          <i class="fa fa-eye-slash" v-if="isShowing"></i>
        </a>
      </div>
      <div class="copyright">
        <p>Copyright © 2020</p>
        <p>Bukalipik's Team. All rights. reserved</p>
      </div>
    </div>
    <div>
      <img src="../assets/bg.png" alt="" />
    </div>
  </div>
</template>

<script>
import server from "../api";
import Notif from "../components/Notif";
import Error from "../components/Error";
export default {
  name: "Login",
  components: {
    Notif,
    Error
  },
  data() {
    return {
      email: "",
      password: "",
      passwordFieldType: "password",
      showPassword: "show",
      isShowing: true,
      show: true,
      message: "",
      errMessage: ""
    };
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    login() {
      server({
        method: "post",
        url: "/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          this.$store.commit("CHANGE_MYERROR", "");
          this.$store.commit("CHANGE_MYNOTIF", response.data.msg);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userName", response.data.data.name);
          localStorage.setItem("userRole", response.data.data.role);
          localStorage.setItem("userImage", response.data.data.image_url);
          this.$store.commit("SET_LOGIN", true);
          this.$store.commit("CHANGE_USERLOGIN", {
            role: localStorage.getItem("userRole"),
            image_url: localStorage.getItem("userImage"),
            name: localStorage.getItem("userName")
          });
          this.$router.push("/dashboard/product");
          (this.user.email = ""), (this.user.password = "");
        })
        .catch(err => {
          this.$store.commit("CHANGE_MYNOTIF", "");
          this.$store.commit("CHANGE_MYERROR", err.response.data.err);
        });
    },
    switchVisibility() {
      (this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password"),
        (this.isShowing = !this.isShowing);
    }
  },
  created() {
    if (localStorage.token) {
      this.$router.push("/dashboard/product");
      this.$store.dispatch("fetchProductsList");
      this.$store.commit("SET_LOGIN", true);
    } else {
      this.$store.commit("SET_LOGIN", false);
    }
  }
};
</script>

<style scoped>
/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .loginPage {
    display: flex;
    overflow: hidden;
    position: fixed;
  }
  .container {
    width: 100%;
    height: 100%;
    margin-left: 0;
    display: flex;
    flex-direction: column;
  }
  h1 {
    margin-top: 50px;
    margin-left: 100px;
    font-weight: bold;
    font-size: 40px;
    text-align: left;
    color: #4d4e52;
    width: 40vw;
  }
  .label {
    text-align: left;
    margin-left: 100px;
    font-size: 23px;
    margin-top: 30px;
    color: #676a6f;
  }
  .username {
    margin-top: 30px;
    margin-left: 100px;
    width: 30vw;
    height: 5vh;
    border: none;
    box-shadow: 0 20px 70px rgba(66, 154, 236, 0.185);
    border-radius: 20px;
    padding-left: 20px;
    color: #676a6f;
  }
  .username:focus {
    outline: none;
  }
  .eyeToggle {
    margin-top: -19vh;
    margin-left: 34vw;
    z-index: 999;
    background: white;
    width: 30px;
    margin-bottom: 14vh;
  }
  .eyeToggle i {
    color: #4d4e52;
  }
  button {
    margin-top: 30px;
    margin-left: 100px;
    width: 30vw;
    height: 5vh;
    box-shadow: 0 20px 70px rgba(66, 154, 236, 0.185);
    border-radius: 20px;
    padding-left: 20px;
    background: #ff6161;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 20px;
  }
  button:focus {
    outline: none;
  }
  button:hover {
    background: #2096f3;
  }
  .register {
    margin-top: 20px;
    margin-left: -13.5vw;
    font-size: 14px;
  }
  .copyright {
    margin-top: 14vh;
    margin-left: 100px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    text-align: left;
    margin-bottom: 0;
  }
  img {
    margin-top: 10vh;
    width: 50vw;
    z-index: 9999;
    padding-right: 100px;
  }
  .notif,
  .error {
    padding: 5px;
    margin-bottom: -25px;
    margin-top: 15px;
    width: 30vw;
    margin-left: 7.5vw;
    border-radius: 20px;
  }
}
</style>
