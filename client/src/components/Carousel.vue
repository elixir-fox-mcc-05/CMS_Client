<template>
    <el-carousel indicator-position="outside">
    <el-carousel-item v-for="(item, o) in dashboard" :key="o">
      <img :src="item.img" alt="">
    </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      dashboard: [
        { img: 'https://dsw.scene7.com/is/image/DSWShoes/417337_125_ss_01?$colpg$' },
        { img: 'https://www.static-src.com/siva/asset//09_2018/nike-legend-odyssey-react-microsite.jpg' },
        { img: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2020%2F02%2Fnike-air-zoom-superrep-womens-hiit-class-sneakers-lime-green-purple-white-release-01.jpg?q=75&w=800&cbr=1&fit=max' }
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
