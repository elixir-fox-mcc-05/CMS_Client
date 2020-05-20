<template>
  <div class="loginPage">
    <div class="container">
      <h1>Welcome to The Greatest Ecommerce Ever, Bukalipik</h1>
      <p class="label">Please insert your email and password, to login</p>
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
// import server from "../api";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      passwordFieldType: "password",
      showPassword: "show",
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
      // server({
      //   method: "post",
      //   url: "/login",
      //   data: {
      //     email: this.user.email,
      //     password: this.user.password
      //   }
      // }).then(response => {
      // console.log(data, "<======data");
      // console.log(response, "<==========response");
      // // localStorage.setItem("token", token);
      // localStorage.setItem("userId", response.data.id);
      // localStorarge.setItem("userName", response.data.name)
      this.$store.commit("SET_LOGIN", true);
      this.$router.push("/dashboard/product");
      // this.user.email = "",
      // this.user.password = ""
      // });
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    }
  },
  created() {}
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
    width: 20vw;
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
  .showPassword {
    margin-top: -28px;
    margin-right: 90px;
  }
  button {
    margin-top: 30px;
    margin-left: 100px;
    width: 20vw;
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
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  .loginPage {
    display: flex;
  }
  .container {
    width: 100vw;
    height: 100vh;
    margin-left: 0;
    display: flex;
    flex-direction: column;
  }
  h1 {
    margin-top: 150px;
    margin-left: 80px;
    font-weight: bold;
    font-size: 50px;
    text-align: left;
    color: #4d4e52;
  }
  .label {
    text-align: left;
    margin-left: 80px;
    font-size: 25px;
    margin-top: 30px;
    color: #676a6f;
  }
  .username {
    margin-top: 30px;
    margin-left: 80px;
    width: 20vw;
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
  button {
    margin-top: 30px;
    margin-left: 80px;
    width: 20vw;
    height: 5vh;
    box-shadow: 0 20px 70px rgba(66, 154, 236, 0.185);
    border-radius: 20px;
    padding-left: 20px;
    background: #409d7e;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 26px;
  }
  button:focus {
    outline: none;
  }
  button:hover {
    background: #58caa4;
  }
  .copyright {
    margin-top: 35vh;
    margin-left: 80px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    text-align: left;
  }
  img {
    margin-top: 7vh;
    margin-right: 8vw;
  }
}
</style>
