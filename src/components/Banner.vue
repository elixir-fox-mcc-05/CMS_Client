<template>
<div class="carousel">
  <vue-flux
    :images="vfImages"
    :transitions="vfTransitions"
    :captions="vfCaptions"
    ref="slider">

    <template v-slot:preloader>
      <flux-preloader />
    </template>

    <template v-slot:caption>
      <flux-caption />
    </template>

    <template v-slot:pagination>
      <flux-pagination />
    </template>

  </vue-flux>
</div>
</template>

<script>
import { VueFlux, FluxCaption, FluxPagination, FluxPreloader } from 'vue-flux'
import one from '../assets/1.png'
import two from '../assets/2.png'

export default {
  name: 'Banner',
  components: {
    VueFlux, FluxCaption, FluxPagination, FluxPreloader
  },
  data () {
    return {
      vfImages: [one, two],
      vfTransitions: ['kenburn', 'waterfall', 'blocks2', 'cube', 'book', 'wave', 'round2'],
      vfCaptions: [
        'Football Weekend Discount Special',
        'GOBER\'S PRESENT: 2021 RUN-ATHON',
        'Caption for image 3'
      ]
    }
  }
}
</script>

<style>
  .carousel {
    width: 50%;
  }
</style>
