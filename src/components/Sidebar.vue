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
import Swal from 'sweetalert2'

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
          title: 'Product',
          icon: 'fas fa-wallet',
          child: [
            {
              href: '/product',
              title: 'Product List',
              icon: 'fas fa-list'
            },
            {
              href: '/addForm',
              title: 'Add Product',
              icon: 'fas fa-plus-square'
            }
          ]
        },
        {
          title: 'Category',
          icon: 'fas fa-layer-group',
          child: [
            {
              href: '/category',
              title: 'Category List',
              icon: 'fas fa-list-alt'
            },
            {
              title: 'Add Category',
              icon: 'fas fa-folder-plus'
            }
          ]
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
      } else if (item.title === 'Add Category') {
        Swal.fire({
          title: 'Input New Category Name',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Add Category'
        })
          .then(result => {
            if (result.value) {
              this.$store.dispatch('addCategory', result.value)
                .then(({ data }) => {
                  console.log(data)
                  Swal.fire(
                    'Added!',
                    `${result.value} successfully added as new category`,
                    'success'
                  )
                  this.$router.push({ name: 'category' })
                })
                .catch(err => {
                  Swal.fire({
                    icon: 'error',
                    title: 'There\'s an error occured',
                    text: `${err.response.data.error}`
                  })
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'No new category added',
                'info'
              )
            }
          })
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
