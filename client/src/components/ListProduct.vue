<template>
    <div>
        <small class="form-text text-muted my-0">
            Yellow row = stock empty
        </small>
        <small class="form-text text-muted my-0 mb-2">
            Click row to edit product
        </small>
        <table class="table table-hover table-bordered table-dark table-responsive-md mb-5">
            <thead>
                <tr>
                    <th scope="col" class="text-center">No</th>
                    <th scope="col" class="text-center col-4">Name</th>
                    <th scope="col" class="text-center">Id</th>
                    <th scope="col" class="text-center">Description</th>
                    <th scope="col" class="text-center">Image</th>
                    <th scope="col" class="text-center col-2">Price (IDR)</th>
                    <th scope="col" class="text-center">Stock</th>
                </tr>
            </thead>
            <router-link
            v-for="(product, i) in products" :key="i"
            :to="`/detail/${product.id}`"
            tag="tbody"
            >
            <tr v-if="product.stock === 0" class="bg-custome-yellow text-dark">
                <th scope="row">{{ i+1 }}.</th>
                <td>{{ product.name }}</td>
                <td>{{ product.id }}</td>
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
            </tr>
            <tr v-else>
                <th scope="row">{{ i+1 }}.</th>
                <td>{{ product.name }}</td>
                <td>{{ product.id }}</td>
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
            </tr>
            </router-link>
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
    .bg-custome-yellow {
        background-color: rgb(255, 251, 0);
    }
</style>
