<template>
  <nav v-if="isSignedIn" class="navbar fixed-top navbar-dark bg-dark">
    <a class="navbar-brand">CMS Dashboard</a>
    <b-button variant="danger" @click="showMsgBoxSignOut">SIGN OUT</b-button>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  date () {
    return {
      signOut: ''
    }
  },
  methods: {
    showMsgBoxSignOut () {
      this.signOut = ''
      this.$bvModal.msgBoxConfirm('Are you sure want to sign out?', {
        okVariant: 'danger',
        okTitle: 'Sign Me Out'
      })
        .then(value => {
          this.boxOne = value
          if (value === true) {
            this.signOutUser()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    signOutUser () {
      this.$store.commit('SET_SIGNED_IN', false)
      localStorage.clear()
      this.$router.push('/')
    }
  },
  computed: {
    isSignedIn () {
      return this.$store.state.isSignedIn
    }
  }
}
</script>

<style></style>
