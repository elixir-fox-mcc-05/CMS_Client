<template>
<div>
<h1>Categories</h1>
  <el-row>
  <el-col :span="3" v-for="(category, index) in categories" :key="index" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }" class="card" :v-model="category">
      <div  @click="detail">
       <img src="https://www.static-src.com/siva/asset//09_2018/nike-legend-odyssey-react-microsite.jpg" class="image">
      </div>
    </el-card>
    <h3>{{ category }}</h3>
  </el-col>
</el-row>
</div>
</template>

<script>
export default {
  name: 'Cards',
  data () {
    return {
      currentDate: 'Pegasus 36 Black',
      num: 1,
      categories: ['shoes', 'upper', 'belt', 'shock', 'sandals'],
      category: ''
    }
  },
  methods: {
    detail () { console.log(`${this.category} clicked`) }
  }
}
</script>

<style scoped>
.time {
font-size: 13px;
color: #999;
}

.bottom {
margin-top: 13px;
line-height: 12px;
}
.button {
padding: 0;
float: right;
}
.image {
width: 100%;
display: block;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>
