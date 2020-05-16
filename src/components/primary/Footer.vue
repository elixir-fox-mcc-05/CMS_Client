<template>
    <footer class="py-5 text-white bg-dark">
      <div class="container">
        <h5>copyleft <span class="copyleft">&copy;</span> 2020
        <custom-icon name="shopping-cart" base-class="custom-icon"></custom-icon>
        <a href="https://chairulakmal.github.io"> chairulakmal</a></h5>
        <!-- <custom-icon name="shopping-cart" base-class="custom-icon"></custom-icon> -->
      </div>
    </footer>
</template>

<script>
import customIcon from 'vue-icon/lib/vue-feather.esm'

export default {
  name: 'Footer',
  components: {
    customIcon
  },
  data: function () {
    return {
      baseClass: 'v-icon'
    }
  }
}
</script>

<style>
.custom-icon {
  width: auto;
  min-width: 10px;
  max-width: 16px;
}
.copyleft {
  display: inline-block;
  transform: rotate(180deg);
}
</style>
