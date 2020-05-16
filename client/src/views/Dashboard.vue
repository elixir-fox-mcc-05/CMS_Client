<template>
  <div class="dashboard">
    <div class="adminNavbar">
      <div class="profile">
        <p class="myProfile">My Profile</p>
        <div class="image">
          <div class="circleImage"></div>
          <img src="../assets/profile-pict.jpg" alt="profile-pict" />
        </div>
        <p class="name">Amir Faisal Z</p>
        <p class="role">Administrator</p>
      </div>
      <div class="link">
        <div class="product navLink">
          <i class="fas fa-shopping-bag"></i>
          <p>Product</p>
        </div>
        <div class="member navLink">
          <i class="fas fa-user"></i>
          <p>Member</p>
        </div>
        <div class="logout navLink">
          <i class="fas fa-sign-out-alt"></i>
          <p>Logout</p>
        </div>
      </div>
    </div>
    <div class="content">
      <Product />
      <Member />
    </div>
    <router-view />
  </div>
</template>

<script>
import Product from "../components/Product";
import Member from "../components/Member";
export default {
  name: `"Dashboard"`,
  components: {
    Product,
    Member
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
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
  padding-top: 50px;
}
.profile .myProfile {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30px;
}
.image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.image .circleImage {
  border: 5px solid #2096f3;
  width: 160px;
  height: 160px;
  align-self: center;
  border-radius: 50%;
}
.image img {
  margin-top: -145px;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
}
.name {
  margin-top: 20px;
  font-weight: bold;
  font-size: 26px;
}
.role {
  font-size: 18px;
}
.link {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.navLink {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 30%;
  cursor: pointer;
  height: 70px;
}
.navlink:active,
.navlink:hover {
  background: #f5f6fa;
}
.navLink p {
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  color: #909090;
}
.navLink p:hover {
  color: #2096f3;
}
.fas {
  font-size: 20px;
  color: #909090;
}
.fas:active,
.fas:hover {
  color: #2096f3;
}
</style>
