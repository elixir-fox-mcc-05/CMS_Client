import Vue from "vue";
import Vuex from "vuex";
import server from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    productList: [],
    userList: []
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLogin = payload;
    },
    SET_PRODUCTLIST(state, payload) {
      state.productList = payload;
    },
    SET_USERLIST(state, payload) {
      state.userList = payload;
    }
  },
  actions: {
    fetchProductList(context) {
      server({
        method: "get",
        url: "/products"
        // headers: {
        //   token: localStorage.token
        // }
      })
        .then(response => {
          context.commit("SET_PRODUCTLIST", response.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchUserList(context) {
      server({
        method: "get",
        url: "/users"
        // headers: {
        //   token: localStorage.token
        // }
      })
        .then(response => {
          context.commit("SET_USERLIST", response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  modules: {}
});
