<template>
  <div class="dashboard">
    <div class="adminNavbar sticky">
      <div class="profile">
        <div class="image">
          <div class="circleImage"></div>
          <img src="../assets/profile-pict.jpg" alt="profile-pict" />
        </div>
        <p class="name">Amir Faisal Z</p>
        <p class="role">Administrator</p>
      </div>
      <div class="link">
        <router-link class="nav-name" to="/dashboard/product">
          <div class="product navLink">
            <i class="fas fa-shopping-bag"></i>
            <p>Product</p>
          </div>
        </router-link>
        <router-link class="nav-name" to="/dashboard/user">
          <div class="user navLink">
            <i class="fas fa-user"></i>
            <p>User</p>
          </div>
        </router-link>
        <div @click.prevent="logout" class="logout navLink">
          <i class="fas fa-sign-out-alt"></i>
          <p>Logout</p>
        </div>
      </div>
    </div>
    <transition name="view">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    logout() {
      this.$store.commit("SET_LOGIN", false);
      this.$router.push("/");
    }
  },
  created() {
    this.$store.commit("SET_LOGIN", true);
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  /* position: fixed; */
}
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
.adminNavbar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: white;
  width: 15%;
  height: 100vh;
}
.profile {
  width: 100%;
  padding-top: 30px;
}
.image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.image .circleImage {
  border: 5px solid #2096f3;
  width: 120px;
  height: 120px;
  align-self: center;
  border-radius: 50%;
}
.image img {
  margin-top: -110px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
.name {
  margin-top: 15px;
  font-weight: bold;
  font-size: 20px;
}
.role {
  font-size: 16px;
  margin-bottom: 20%;
}
.link {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}
.navLink {
  /* margin-top: 10%; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10%;
  cursor: pointer;
  height: 40px;
}
.navLink p {
  font-size: 16px;
  font-weight: bold;
  margin-left: 20px;
  color: #909090;
}
.fas {
  font-size: 16px;
  color: #909090;
}
.product:hover,
.product:active {
  background: #f5f6fa;
}
.user:hover,
.user:active {
  background: #f5f6fa;
}
.logout {
  margin-left: 10%;
  width: 80%;
  padding-left: 8%;
}
.logout:hover,
.logout:active {
  background: #f5f6fa;
}
.navLink p:hover,
.navlink p:active {
  color: #2096f3;
}
.fas:active,
.fas:hover {
  color: #2096f3;
}
</style>
