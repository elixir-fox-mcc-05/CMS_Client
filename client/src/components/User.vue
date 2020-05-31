<template>
  <div class="userContainer">
    <h1>User</h1>
    <div class="user">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-for="user in userList" :key="user.id">
          <tr>
            <td>{{ user.id }}</td>
            <td>
              <img :src="user.image_url" alt="user image" />
            </td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button
                @click.prevent="showEditPage(user.id)"
                class="edit"
                href=""
              >
                Edit Role
              </button>
              <button
                @click.prevent="showDeletePage(user.id)"
                class="delete"
                href=""
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  computed: {
    currentPage() {
      return this.$store.state.currentPage;
    },
    userList() {
      return this.$store.state.userList;
    }
  },
   methods: {
    showEditPage(id) {
      this.$router.push(`/dashboard/edit-user/${id}`);
    },
    showDeletePage(id) {
      this.$router.push(`/dashboard/delete-user/${id}`);
    }
  },
  created() {
    this.$store.dispatch("fetchUserList");
  }
};
</script>

<style scoped>
.userContainer {
  padding-left: 17.5vw;
  padding-top: 4vh;
}
.addUser {
  margin-top: -20px;
  margin-right: -70vw;
  text-decoration: none;
  background: #2096f3;
  color: white;
  border-radius: 20px;
  width: 100px;
  height: 30px;
  border: none;
  cursor: pointer;
}
.addUser:focus {
  outline: none;
  background: #1b88db;
}
.user {
  background: white;
  border-radius: 20px;
}
h1 {
  text-align: left;
}
table {
  border-collapse: collapse;
  margin-top: 2vh;
  width: 80vw;
  overflow: hidden;
  z-index: -99;
  margin-bottom: 5vh;
}
th,
td {
  padding: 20px 0 40px 40px;
  text-align: left;
}
th {
  color: #909090;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 30px;
}
td {
  padding-bottom: 20px;
  vertical-align: center;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2096f3;
}
.edit {
  margin-right: 20px;
  text-decoration: none;
  background: lightgreen;
  border-radius: 20px;
  width: 100px;
  height: 30px;
  border: none;
  cursor: pointer;
}
.edit:focus {
  outline: none;
  background: rgb(125, 211, 125);
}
.delete {
  margin-right: 20px;
  text-decoration: none;
  background: lightpink;
  border-radius: 20px;
  width: 100px;
  height: 30px;
  border: none;
  cursor: pointer;
}
.delete:focus {
  outline: none;
  background: rgb(230, 159, 170);
}
</style>
