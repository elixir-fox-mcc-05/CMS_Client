<template>
  <div class="addUserPage">
    <div class="addUserGroup">
      <p @click="closeBtn" class="closeAddForm">close</p>
      <h1>
        Add User
      </h1>
      <div class="formInput">
        <label class="labelAddUser">
          <h4>User Name:</h4>
          <input v-model="newUser.name" type="text" class="addUserInput" />
        </label>
        <label class="labelAddUser">
          <h4>Image Url:</h4>
          <input v-model="newUser.image_url" type="text" class="addUserInput" />
        </label>
        <label class="labelAddUser">
          <h4>Email:</h4>
          <input v-model="newUser.email" type="text" class="addUserInput" />
        </label>
        <label class="labelAddUser">
          <h4>Role:</h4>
          <input v-model="newUser.role" type="text" class="addUserInput" />
        </label>
        <input
          @click.prevent="addNewUser"
          type="submit"
          value="Add User"
          class="submitForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import server from "../api";
export default {
  name: "AddUser",
  data() {
    return {
      newUser: {
        name: "",
        image_url: "",
        email: "",
        role: ""
      }
    };
  },
  methods: {
    closeBtn() {
      this.$router.push("/dashboard/user");
    },
    addNewUser() {
      server({
        method: "post",
        url: "/users",
        headers: {
          token: localStorage.token
        },
        data: {
          name: this.newUser.name,
          image_url: this.newUser.image_url,
          email: this.newUser.email,
          role: this.newUser.role
        }
      }).then(response => {
        this.$store.dispatch("fetchUserList");
        this.$router.push("/dashboard/user");
        console.log(response);
      });
    }
  }
};
</script>

<style scoped>
.addUserPage {
  height: 100vh;
  width: 100vw;
  padding: 10vh 10px 0;
  display: flex;
  justify-content: center;
  position: fixed;
  background: #f5f6fa;
  z-index: 120;
}

.addUserGroup {
  width: 35vw;
  height: 76vh;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
}

.closeAddForm {
  display: flex;
  padding-left: 29vw;
  font-size: 18px;
  position: absolute;
  cursor: pointer;
  color: lightcoral;
}

h1 {
  text-transform: uppercase;
  color: #313236;
  font-size: 20px;
  margin-left: -23vw;
  margin-bottom: 10px;
}

.labelAddUser {
  display: block;
  width: 24vw;
  margin: 15px 30px;
  text-align: center;
}

h4 {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  color: #778192;
}

.addUserInput {
  width: 125%;
  margin-top: 20px;
  font-size: 16px;
  border-width: 0px;
  border-bottom: 1px solid #31323623;
  text-align: left;
  margin-bottom: 20px;
  font-size: 18px;
}

textarea:focus,
input:focus {
  outline: none;
  border-bottom: 1px solid #313236;
}

.submitForm {
  background: #2096f3;
  color: white;
  text-transform: uppercase;
  border: none;
  height: 30px;
  width: 250px;
  font-size: 14px;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
}

.submitForm:hover {
  background: #1b80ce;
}
</style>
