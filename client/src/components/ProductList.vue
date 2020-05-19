<template>
  <tr>
    <td>
        <img :src="product.imgUrl" :alt="product.title" width="100px" height="100px">
    </td>
    <td>{{ product.stock }}</td>
    <td>{{ product.name }}</td>
    <td>Rp.{{ convertToRp(product.price) }}</td>
    <td>{{ product.category_name }} </td>
    <td>
        <button class="btn btn-warning btn-sm btn-block">Edit</button>
        <button class="btn btn-danger btn-sm btn-block" @click.prevent="deleteBtn(product.id)">Delete</button>
    </td>
</tr>
</template>

<script>
import convertToRp from '../script/convertToRp.js'

export default {
    name: "ProductList",
    props: ['product'],
    methods: {
        convertToRp (price) {
            return convertToRp(price)
        },
        deleteBtn (id) {
            this.$store.dispatch('deleteProduct', id)
        }
    }
}
</script>

<style>

</style>
