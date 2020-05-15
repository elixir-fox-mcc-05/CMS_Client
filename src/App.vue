<template>
  <div id="app">
    <NavigationBar />
    <Content />
    <Footer />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
import Content from '@/components/Content.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    NavigationBar,
    Content,
    Footer
  }
}
</script>

<style></style>
