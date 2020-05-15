<template>
  <div class="home">
    <div v-if="this.admin">
      <AdminDashboard></AdminDashboard>
    </div>
    <div v-else>
    <NavDashboard v-if="setIsLogin()"></NavDashboard>
    <Nav v-else-if="!setIsLogin()"></Nav>
    <Carousel></Carousel>
    <Form></Form>
    <Cards></Cards>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Carousel from '@/components/Carousel.vue'
import Cards from '@/components/Cards.vue'
import Nav from '@/components/Navigation.vue'
import NavDashboard from '@/components/NavDashboard.vue'
import AdminDashboard from '@/components/AdminDashboard.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    Cards,
    Nav,
    NavDashboard,
    AdminDashboard
  },
  computed: {
    admin () {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    setIsLogin () {
      if (localStorage.access_token) {
        axios({
          method: 'GET',
          url: 'http://localhost:3000/indetify',
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then(({ data }) => {
            this.$store.commit('SET_IS_ADMIN', data.isAdmin)
            this.$store.commit('SET_IS_LOGIN', true)
          })
        return true
      } else {
        this.$store.commit('SET_IS_LOGIN', false)
        return false
      }
    }
  },
  created () {
    this.setIsLogin()
  }
}
</script>
