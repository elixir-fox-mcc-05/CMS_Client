<template>
    <div>
        <b-sidebar
                position="static"
                :expand-on-hover="expandOnHover"
                type="is-light"
                open
            >
                <div class="p-1">
                    <b-menu class="is-custom-mobile">
                        <b-menu-list label="Menu"  v-if="loggedIn">
                            <b-menu-item icon="information-outline" class="has-text-left" label="List" @click="$router.push('/menu')"></b-menu-item>
                            <b-menu-item active expanded icon="settings"  class="has-text-left " label="Administrator">
                                <b-menu-item icon="account" label="List"></b-menu-item>
                                <b-menu-item icon="cellphone-link" label="Devices"></b-menu-item>
                            </b-menu-item>
                        </b-menu-list>
                        <b-menu-list label="Menu" v-if="!loggedIn">
                            <b-menu-item label="Login" class="has-text-left" icon="account" @click="$router.push('/')"></b-menu-item>
                            <b-menu-item label="Register" class="has-text-left" icon="account" @click="$router.push('/register')"></b-menu-item>
                            <b-menu-item label="About" class="has-text-left" icon="account" @click="$router.push('/about')"></b-menu-item>
                        </b-menu-list>
                        <b-menu-list label="Actions" v-if="loggedIn">
                            <b-menu-item icon="logout" label="Logout" @click.prevent="logout()"></b-menu-item>
                        </b-menu-list>
                    </b-menu>
                </div>
            </b-sidebar>
    </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      reduce: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.loggedIn
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.state.loggedIn = false
      this.$router.push('/')
    },
    edit (id) {
      this.$store.dispatch('login')
        .then(({ data }) => {
          console.log('masuk')
          const token = data.token
          localStorage.setItem('token', token)
          this.$router.push({ name: 'Menu' })
        })
    },
    delete (id) {
      this.$store.dispatch('login')
        .then(({ data }) => {
          console.log('masuk')
          const token = data.token
          localStorage.setItem('token', token)
          this.$router.push({ name: 'Menu' })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
$menu-item-active-background-color : hsl(0, 0%, 71%);
$sidebar-background : #000000;
</style>
