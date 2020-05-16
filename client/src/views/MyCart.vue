<template>
  <div class="">
    <h1>TOTAL PAYMENT : {{this.$store.state.total}}</h1>
    <button class="btn">Buy All</button>
      <table>
        <tr>
          <th>Name</th>
          <th>Demand</th>
          <th>Sub Total</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
        <tr v-for="item in Items" :key="item.id" :item="item">
          <td>{{item.Product.name}}</td>
          <td>{{item.demand}}</td>
          <td>{{item.subTotal}}</td>
          <td>{{item.createdAt}}</td>
          <td><button class="tb-btn">Cancle</button></td>
        </tr>
      </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0
    }
  },
  created () {
    this.$store.dispatch('cartItems')
  },
  computed: {
    Items () {
      return this.$store.state.cartItems
    }
  }
}
</script>

<style scoped>
  table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.tb-btn {
  width: 100%;
  height: 100%;
  margin-bottom: 0.5em;
  padding-top: .6em;
  padding-bottom: .6em;
  border-radius: 5px;
}
.btn {
  margin-bottom: 0.5em;
  padding-top: .6em;
  padding-bottom: .6em;
}
</style>
