<template>
  <div class="registerPage">
    <div>
      <img src="../assets/register-bg.png" alt />
    </div>
    <div class="container">
      <h1>Create Bukalipik account</h1>
      <p class="label">it's free and always will be</p>
      <Notif class="notif"/>
      <Error class="error"/>
      <input
        v-model="name"
        class="username"
        type="text"
        placeholder="Enter your name"
      />
      <input
        v-model="email"
        class="username"
        type="text"
        placeholder="Enter your email"
      />
      <input
        v-model="password"
        class="username"
        type="password"
        placeholder="Enter your password"
      />
      <input
        v-model="image_url"
        class="username"
        type="text"
        placeholder="Enter your image url"
      />
      <button @click.prevent="register">Register</button>
      <p class="login">
        already have an account?
        <a @click.prevent="login" href>login here</a>
      </p>
      <div class="copyright">
        <p>Copyright © 2020</p>
        <p>Bukalipik's Team. All rights. reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
import server from "../api";
import Notif from "../components/Notif";
import Error from "../components/Error";
export default {
  name: "Register",
  components: {
    Notif,
    Error
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      image_url: ""
    };
  },
  methods: {
    register() {
      server({
        method: "post",
        url: "/register",
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
          image_url: this.image_url
        }
      })
        .then(response => {
          this.$store.commit("CHANGE_MYERROR", "");
          this.$store.commit("CHANGE_MYNOTIF", response.data.msg);
          (this.name = ""),
          (this.email = ""),
          (this.password = ""),
          (this.image_url = "");
        })
        .catch(err => {
          this.$store.commit("CHANGE_MYNOTIF", "");
          this.$store.commit("CHANGE_MYERROR", err.response.data.err);
        });
    },
    login() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .registerPage {
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
    margin-top: 10px;
    margin-left: 2vw;
    font-weight: bold;
    font-size: 40px;
    text-align: right;
    color: #4d4e52;
    width: 40vw;
  }
  .label {
    text-align: right;
    margin-right: 9vw;
    font-size: 23px;
    margin-top: 20px;
    color: #676a6f;
  }
  .username {
    margin-top: 30px;
    margin-left: 10vw;
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
  button {
    margin-top: 30px;
    margin-left: 10vw;
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
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  button:hover {
    background: #2096f3;
  }
  .login {
    margin-top: 20px;
    margin-right: 10vw;
    font-size: 14px;
    text-align: right;
  }
  .copyright {
    margin-top: 7vh;
    margin-right: 3vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    margin-bottom: 0;
    text-align: right;
  }
  img {
    margin-top: 20vh;
    width: 40vw;
    margin-left: 8vw;
    z-index: 99999;
  }
  .notif,
  .error {
    padding: 5px;
    margin-bottom: -25px;
    margin-top: 15px;
    width: 30vw;
    margin-left: 10vw;
    border-radius: 20px;
  }
}
</style>
