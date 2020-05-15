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
                                <b-menu-item icon="account" label="Add" @click.prevent="showAddProduct"></b-menu-item>
                                <b-menu-item icon="cellphone-link" label="Info" @click.prevent="showAccInfo"></b-menu-item>
                            </b-menu-item>
                            <b-menu-item active expanded icon="settings"  class="has-text-left " label="Categories">
                              <b-menu-item icon="cellphone-link" label="Info" @click.prevent="showCategoryList"></b-menu-item>
                                <b-menu-item icon="account" label="Add" @click.prevent="showAddCategories"></b-menu-item>
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
    showAccInfo () {
      this.$router.push()
    },
    showAddProduct () {
      this.$router.push('/addproduct')
    },
    showCategoryList(){
      this.$router.push('/addcategory')
    },
    showAddCategories(){
      this.$router.push('/category')
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.state.loggedIn = true
      this.$store.dispatch('fetchproducts')
    } else {
      this.$router.push('/')
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
