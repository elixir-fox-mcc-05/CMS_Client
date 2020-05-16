<template>
  <div id="app">
    <Sidebar
      v-if="isLogin"
    />
    <div
      id="content"
      :class="{'collapsed': collapsed }"
    >
      <div class="gober">
        <img src="./assets/gobers-logo.png" alt="gobers logo" class="logo" width="180px">
      </div>
      <hr>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  name: 'App',
  components: {
    Sidebar
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    collapsed () {
      return this.$store.state.collapsed
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('set_login_status', true)
      this.$store.dispatch('getAllCategory')
    } else {
      this.$router.push({ name: 'Home' })
      this.$store.commit('set_login_status', false)
    }
  }
}
</script>>

<style>

img {
  text-align: center;
}
#content.collapsed {
  padding-left: 50px;
}

#content {
  padding-left: 350px;
}

.gober {
  display: flex;
  justify-content: center;
  align-items: center;
}

hr {
  height: 5px;
  border: 0;
  box-shadow: 0 10px 10px -10px #8c8b8b inset;
}
</style>
