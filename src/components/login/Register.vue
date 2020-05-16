<template>
  <div
    class="modal fade"
    id="registerModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="register"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document" style="width: 50%;">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="exampleModalLabel"
            style="width:100%; padding-left:40%; font-weight: bolder;  font-size: 18px;"
          >Sign Up</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container" style="background: url('./assets/coba.jpg'); padding:10px;">
            <div class="row">
              <div class="col-12">
                <form @submit.prevent="register">
                  <div class="form-group">
                    <label for="registerUsername" style="font-size: 14px;">Name</label>
                    <input
                      v-model="registerUsername"
                      type="text"
                      class="form-control"
                      id="registerUsername"
                      aria-describedby="Your username"
                      placeholder="Enter username"
                      style="font-size: 14px;"
                    />
                  </div>
                  <div class="form-group">
                    <label for="registerEmail" style="font-size: 14px;">Email address</label>
                    <input
                      v-model="registerEmail"
                      type="email"
                      class="form-control"
                      id="registerEmail"
                      aria-describedby="Your email address"
                      placeholder="Enter email"
                      style="font-size: 14px;"
                    />
                  </div>
                  <div class="form-group">
                    <label for="registerPassword" style="font-size: 14px;">Password</label>
                    <input
                      v-model="registerPassword"
                      type="password"
                      class="form-control"
                      id="registerPassword"
                      placeholder="Password"
                      style="font-size: 14px;"
                    />
                  </div>
                  <div class="modal-footer">
                    <button type="submit" class="mt-2 btn btn-light" style="font-size: 14px;">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <p
          class="btn"
          style="font-size: 12.5px;
          color: black;
          font-family: Montserrat, sans-serif;"
        >
          Already have account ?
          <a
            data-toggle="modal"
            data-target="#loginModal"
            data-dismiss="modal"
            class="btncard"
            style="font-size: 12.5px;
            color: blue;
            font-family: Montserrat, sans-serif;"
          >Sign in</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      pass: false
    };
  },
  methods: {
    register() {
      console.log("register");
      let payload = {
        username: this.registerUsername,
        email: this.registerEmail,
        password: this.registerPassword
      };
      console.log(`trigger`, payload);
      this.$store
        .dispatch("register", payload)
        .then(_ => {
          console.log(`masuk button`);
          $("#a").submit(function(e) {
            e.preventDefault();
            $("#registerModal").modal("hide");
            $("#loginModal").modal("toggle");
            return false;
          });
          this.registerUsername = "";
          this.registerEmail = "";
          this.registerPassword = "";
          this.$router.push("/login");
        })
        .catch(({ response }) => {
          console.log(response, "masuk err register");
          
        });
    }
  }
};
</script>

<style  scoped>
.btncard {
  background-color: transparent;
  font-size: 12px;
  /* color: black; */
  color: blue;
  border-style: 1px solid rgb(233, 233, 233) !important;
  font-family: "Montserrat", sans-serif;
}

.btncard:hover {
  background-color: rgb(230, 230, 230);
  cursor: pointer;
}
</style>
