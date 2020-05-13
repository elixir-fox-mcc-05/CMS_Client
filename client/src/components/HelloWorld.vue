<template>
  <div class="hello">
    <section class="section">
     <div class="container">
      <div class="columns">
        <div class="column is-4">
             <b-sidebar
                position="static"
                :mobile="mobile"
                :expand-on-hover="expandOnHover"
                :reduce="reduce"
                type="is-light"
                open
            >
                <div class="p-1">
                    <b-menu class="is-custom-mobile">
                        <b-menu-list label="Menu"  v-if="loggedIn">
                            <b-menu-item icon="information-outline" class="has-text-left" label="Info"></b-menu-item>
                            <b-menu-item active expanded icon="settings"  class="has-text-left " label="Administrator">
                                <b-menu-item icon="account" label="Users"></b-menu-item>
                                <b-menu-item icon="cellphone-link" label="Devices"></b-menu-item>
                                <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
                            </b-menu-item>
                            <b-menu-item icon="account" class="has-text-left" label="My Account">
                                <b-menu-item icon="account-box" label="Account data"></b-menu-item>
                                <b-menu-item icon="home-account" label="Addresses"></b-menu-item>
                            </b-menu-item>
                        </b-menu-list>
                        <b-menu-list label="Menu" v-if="!loggedIn">
                            <b-menu-item label="Login" class="has-text-left" icon="account"></b-menu-item>
                            <b-menu-item label="Register" class="has-text-left" icon="account"></b-menu-item>
                        </b-menu-list>
                        <b-menu-list label="Actions" v-if="loggedIn">
                            <b-menu-item icon="logout" label="Logout"></b-menu-item>
                        </b-menu-list>
                    </b-menu>
                </div>
            </b-sidebar>
        </div>
        <div class="column">
        <p class="has-text-left">asd</p>
        </div>
      </div>
     </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      loggedIn: true
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
$menu-item-active-background-color : hsl(0, 0%, 71%);
$sidebar-background : #000000;
</style>
