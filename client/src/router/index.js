import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Missing from "../components/Missing.vue";
import Dashboard from "../views/Dashboard.vue";
// dashboard children
// product start
import Product from "../components/Product.vue";
import AddProduct from "../components/AddProduct.vue";
import EditProduct from "../components/EditProduct.vue";
import DeleteProduct from "../components/DeleteProduct.vue";
// user start
import User from "../components/User.vue";
import AddUser from "../components/AddUser.vue";
import EditUser from "../components/EditUser.vue";
import DeleteUser from "../components/DeleteUser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "product",
        name: "Product",
        component: Product
      },
      {
        path: "add-product",
        name: "AddProduct",
        component: AddProduct
      },
      {
        path: "edit-product/:id",
        name: "EditProduct",
        component: EditProduct
      },
      {
        path: "delete-product/:id",
        name: "DleteProduct",
        component: DeleteProduct
      },
      {
        path: "user",
        name: "User",
        component: User
      },
      {
        path: "add-user",
        name: "AddUser",
        component: AddUser
      },
      {
        path: "edit-user/:id",
        name: "EditUser",
        component: EditUser
      },
      {
        path: "delete-user/:id",
        name: "DleteUser",
        component: DeleteUser
      },
    ]
  },
  {
    path: "*",
    component: Missing
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
