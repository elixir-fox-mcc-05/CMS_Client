<template>
  <v-app class="black">
    <nav>
      <v-app-bar flat app class="black">
        <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer" v-if="isLogin"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase grey--text" style="padding-right:10px">
          <span class="font-weight-light">Belanja</span>
          <span>.in</span>
        </v-toolbar-title>
        <v-toolbar class="black">
          <v-btn icon v-if="!isLogin">
            <router-link to="/login">Login</router-link>
          </v-btn>
        </v-toolbar>
      </v-app-bar>
      <v-navigation-drawer app v-model="drawer" class="grey" v-if="isLogin">
          <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click.prevent="getHome">Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-tag</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click.prevent="getCategory">Category</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-shopping</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click.prevent="getProduct">Product</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
                <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click.prevent="logout">Log Out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-navigation-drawer>
    </nav>
    <v-content class="black">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
      this.$router.push('/')
    },
    getCategory () {
      this.$router.push('/category')
    },
    getProduct () {
      this.$router.push('/product')
    },
    getHome () {
      this.$router.push('/admin')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN', true)
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
  v-app {
    background: black;
  }
</style>
