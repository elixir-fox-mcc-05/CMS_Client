<template>
  <div class="addUserPage">
    <div class="addUserGroup">
      <p @click="closeBtn" class="closeAddForm">close</p>
      <h1>
        Edit User
      </h1>
      <div class="formInput">
        <label class="labelAddUser">
          <h4>User Name:</h4>
          <p>{{ editUser.name }}</p>
        </label>
        <label class="labelAddUser">
          <h4>Current Role :</h4>
          <p class="currentRole">{{ editUser.role }}</p>
        </label>
        <label class="labelAddUser">
          <h4>Change Role to:</h4>
          <select v-model="selected" class="selectRole">
            <option value="">--Choose Role--</option>
            <option>Super-admin</option>
            <option>Admin</option>
            <option>Member</option>
          </select>
        </label>
        <input @click.prevent="editUserById" type="submit" class="submitForm" />
      </div>
    </div>
  </div>
</template>

<script>
import server from "../api";
export default {
  name: "EditUser",
  data() {
    return {
      selected: "",
      editUser: {
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
    getUserById() {
      server({
        method: "get",
        url: `/user/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then((response) => {
          this.editUser = response.data.user;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editUserById() {
      server({
        method: "patch",
        url: `/user/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          role: this.selected
        }
      })
        .then((response) => {
          this.$router.push("/dashboard/user");
          this.$store.commit("CHANGE_MYERROR", "");
          this.$store.commit("CHANGE_MYNOTIF", response.data.msg);
        })
        .catch((err) => {
          this.$store.commit("CHANGE_MYNOTIF", "");
          this.$store.commit("CHANGE_MYERROR", err.response.data.err);
        });
    }
  },
  created() {
    this.getUserById();
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
  margin-top: 10vh;
  width: 35vw;
  height: 42vh;
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

.formInput {
  padding: 0 30px 20px;
}

.labelAddUser {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 3vh;
}

h4 {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  color: #778192;
}

.labelAddUser p {
  font-size: 14px;
  margin-left: 3vw;
  color: #778192;
  font-weight: bold;
}

.labelAddUser .currentRole {
  margin-left: 2vw;
}

.selectRole {
  margin-left: 1vw;
  width: 15vw;
}

.submitForm {
  margin-top: 5vh;
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
