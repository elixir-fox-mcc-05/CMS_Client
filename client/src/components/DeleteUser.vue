<template>
  <div class="modalDeletePage">
    <div class="modalDeleteGroup">
      <h6>
        Are you sure you want to delete this user? <br />
        Data will never be comeback.
      </h6>
      <div class="buttonModalGroup">
        <button class="delete" @click.prevent="deleteUser">
          Delete now
        </button>
        <button @click.prevent="cancel" class="cancel">Cancel</button>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import server from "../api";
export default {
  name: "DeleteUser",
  methods: {
    cancel() {
      this.$router.push("/dashboard/user");
    },
    deleteUser() {
      server({
        method: "delete",
        url: `/user/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then((response) => {
          this.$store.dispatch("fetchUserList");
          this.$router.push({ name: "User" });
          this.$store.commit("CHANGE_MYERROR", "");
          this.$store.commit("CHANGE_MYNOTIF", response.data.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.modalDeletePage {
  background: #f5f6fa;
  width: 100vw;
  height: 100vh;
  position: fixed;
}
.modalDeleteGroup {
  background: white;
  width: 30vw;
  height: 30vh;
  z-index: 999;
  margin-top: 30vh;
  margin-left: 35vw;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
}
h6 {
  font-size: 16px;
}
.buttonModalGroup {
  margin-top: 30px;
}
button {
  margin-right: 20px;
  text-decoration: none;
  border-radius: 20px;
  width: 100px;
  height: 30px;
  border: none;
  cursor: pointer;
}
.delete {
  background: lightpink;
}
.delete:focus {
  outline: none;
  background: rgb(230, 159, 170);
}
.cancel {
  background: lightgreen;
}
.cancel:focus {
  outline: none;
  background: rgb(125, 211, 125);
}
</style>
