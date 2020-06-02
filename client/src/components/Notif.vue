<template>
  <div class="notif">
    <h5>{{ myNotif }}</h5>
  </div>
</template>

<script>
export default {
  name: "NotifSection",
  computed: {
    myNotif() {
      return this.$store.state.myNotif;
    }
  },
  created() {
    setTimeout(() => {
      this.$store.commit("CHANGE_MYNOTIF", "");
    }, 1000);
  },
  updated() {
    setTimeout(() => {
      this.$store.commit("CHANGE_MYNOTIF", "");
    }, 1000);
  }
};
</script>

<style scoped>
.notif {
  color: green;
}
</style>
