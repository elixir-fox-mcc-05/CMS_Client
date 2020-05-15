<template>
  <SidebarMenu
    :menu="menu"
    :collapsed="collapsed"
    @toggle-collapse="onToggleCollapse"
    @item-click="onItemClick"
/>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'

export default {
  components: {
    SidebarMenu
  },
  data () {
    return {
      menu: [
        {
          header: true,
          title: 'Gober\'s Sporting Goods',
          hiddenOnCollapse: true
        },
        {
          href: '/Dashboard',
          title: 'Dashboard',
          icon: 'fas fa-house-user'
        },
        {
          href: '/product',
          title: 'Product',
          icon: 'fas fa-list'
        },
        {
          href: '/addForm',
          title: 'Add Product',
          icon: 'fas fa-plus-square'
        },
        {
          title: 'Logout',
          icon: 'fas fa-sign-out-alt'
        }
      ]
    }
  },
  methods: {
    onToggleCollapse (collapsed) {
      this.$store.commit('set_collapsed')
    },
    onItemClick (event, item) {
      if (item.title === 'Logout') {
        this.$store.commit('set_login_status', false)
        this.$router.push({ name: 'Home' })
        localStorage.removeItem('access_token')
      }
    }
  },
  computed: {
    collapsed () {
      return this.$store.state.collapsed
    }
  }
}
</script>

<style>

</style>
