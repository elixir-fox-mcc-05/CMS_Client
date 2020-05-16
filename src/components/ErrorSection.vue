<template>
  <div id="errSection" class="container center">
    <div v-if="Array.isArray(currentErr)">
      <p v-for="message in currentErr" :key="message">{{ message.message }}</p>
    </div>
    <div v-else>
      <p>{{ currentErr }}</p>
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
  #errSection {
    color: red;
    padding-top: 20px;
  }
</style>
