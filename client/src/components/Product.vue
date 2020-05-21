<template>
  <div class="productContainer">
    <h1>Products</h1>
    <router-link to="/dashboard/add-product">
      <button class="addProduct">Add Product</button>
    </router-link>
    <div class="product">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-for="product in productList" :key="product.id">
          <tr>
            <td>{{ product.id }}</td>
            <td>
              <img :src="product.image_url" alt="product image" />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <button
                @click.prevent="showEditPage(product.id)"
                class="edit"
                href=""
              >
                Edit
              </button>
              <button
                @click.prevent="showDeletePage(product.id)"
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
  name: "Product",
  computed: {
    currentPage() {
      return this.$store.state.currentPage;
    },
    productList() {
      return this.$store.state.productList;
    }
  },
  methods: {
    showEditPage(id) {
      this.$router.push(`/dashboard/edit-product/${id}`);
    },
    showDeletePage(id) {
      this.$router.push(`/dashboard/delete-product/${id}`);
    }
  },
  created() {
    if (!localStorage.token) {
      this.$store.commit("SET_LOGIN", false);
      this.$router.push("/");
    } else {
      this.$store.dispatch("fetchProductList");
    }
  }
};
</script>

<style scoped>
.productContainer {
  padding-left: 17.5vw;
  padding-top: 4vh;
}
.addProduct {
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
.addProduct:focus {
  outline: none;
  background: #1b88db;
}
.product {
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
  padding: 20px 40px 0;
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
  width: 5vw;
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
