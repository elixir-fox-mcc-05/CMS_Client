<template>
  <div>
    <div v-if="Array.isArray(currentErr)">
      <h5 v-for="message in currentErr" :key="message">{{ message }}</h5>
    </div>
    <div v-else>
      <h5>{{ currentErr }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorSection',
  computed: {
    currentErr () {
      return this.$store.state.currentErr
    }
  }
}
</script>

<style>
  h4 {
    color: red;
  }
</style>
