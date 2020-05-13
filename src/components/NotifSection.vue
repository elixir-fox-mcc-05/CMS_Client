<template>
  <div>
    <h4></h4>
  </div>
</template>

<script>
export default {
  name: 'NotifSection',
  computed: {
    currentNotif () {
      return this.$store.state.currentNotif
    }
  }
}
</script>

<style scoped>
h4 {
  color: green
}
</style>
