<template>
  <div class="addProductPage">
    <div class="addProductGroup">
      <p @click="closeBtn" class="closeAddForm">close</p>
      <h1>
        Add Product
      </h1>
      <div class="formInput">
        <label class="labelAddProduct">
          <h4>Product Name:</h4>
          <input
            v-model="newProduct.name"
            type="text"
            class="addProductInput"
          />
        </label>
        <label class="labelAddProduct">
          <h4>Image Url:</h4>
          <input
            v-model="newProduct.image_url"
            type="text"
            class="addProductInput"
          />
        </label>
        <label class="labelAddProduct">
          <h4>Price:</h4>
          <input
            v-model="newProduct.price"
            type="text"
            class="addProductInput"
          />
        </label>
        <label class="labelAddProduct">
          <h4>Stock:</h4>
          <input
            v-model="newProduct.stock"
            type="text"
            class="addProductInput"
          />
        </label>
        <input
          @click.prevent="addNewProduct"
          type="submit"
          value="Add Product"
          class="submitForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import server from "../api";
export default {
  name: "AddProduct",
  data() {
    return {
      newProduct: {
        name: "",
        image_url: "",
        price: "",
        stock: ""
      }
    };
  },
  methods: {
    closeBtn() {
      this.$router.push("/dashboard/product");
    },
    addNewProduct() {
      server({
        method: "post",
        url: "/products",
        // headers: {
        //   token: localStorage.token
        // },
        data: {
          name: this.newProduct.name,
          image_url: this.newProduct.image_url,
          price: this.newProduct.price,
          stock: this.newProduct.stock
        }
      }).then(response => {
        this.$store.dispatch("fetchProductList");
        this.$router.push("/dashboard/product");
        console.log(response);
      });
    }
  }
};
</script>

<style scoped>
.addProductPage {
  height: 100vh;
  width: 100vw;
  padding: 10vh 10px 0;
  display: flex;
  justify-content: center;
  position: fixed;
  background: #f5f6fa;
  z-index: 120;
}

.addProductGroup {
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
  margin-left: -20vw;
  margin-bottom: 10px;
}

.labelAddProduct {
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

.addProductInput {
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
