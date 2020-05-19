<template>
    <div>
        <table class="table table-hover table-bordered table-dark table-responsive-md">
            <thead>
                <tr>
                    <th scope="col" class="text-center">Id</th>
                    <th scope="col" class="text-center col-4">Name</th>
                    <th scope="col" class="text-center">Description</th>
                    <th scope="col" class="text-center">Image</th>
                    <th scope="col" class="text-center col-2">Price (IDR)</th>
                    <th scope="col" class="text-center">Stock</th>
                </tr>
            </thead>
            <tbody>
                <router-link
                v-for="(product, i) in products" :key="i"
                :to="`/detail/${product.id}`"
                tag="tr"
                >
                    <th scope="row">{{ product.id }}</th>
                    <td>{{ product.name }}</td>
                    <td>
                        <div v-if="product.description == 'No description'">
                            <h6 class="text-center text-danger bold">X</h6>
                        </div>
                        <div v-else>
                            <h6 class="text-center text-success bold">V</h6>
                        </div>
                    </td>
                    <td>
                        <div v-if="product.image_url == 'No image available'">
                            <h6 class="text-center text-danger bold">X</h6>
                        </div>
                        <div v-else>
                            <h6 class="text-center text-success bold">V</h6>
                        </div>
                    </td>
                    <td class="text-right">{{ product.price }}</td>
                    <td class="text-right">{{ product.stock }}</td>
                </router-link>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  name: 'ListProduct',
  props: ['products']
}
</script>

<style>
</style>
