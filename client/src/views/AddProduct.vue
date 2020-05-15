<template>
<section>

        <b-field label="Name">
            <b-input v-model="name" placeholder="No label" rounded></b-input>
        </b-field>

        <b-field label="iImage URL">
            <b-input v-model="image_url" placeholder="No label" rounded></b-input>
        </b-field>

        <b-field label="Stock">
            <b-input v-model="stock" placeholder="No label" rounded></b-input>
        </b-field>

        <b-field label="Price">
            <b-input v-model="price" placeholder="No label" rounded></b-input>
        </b-field>

    </section>
</template>

<script>
export default {
    name:'addProduct',
    methods: {
        newProduct(){
            let newData = {
                name : this.name,
                image_url : this.image_url,
                stock : this.stock,
                price : this.price,
                category : this.category
            }
        }
    },
    created() {
        if(!localStorage.token){
            this.$router.push('/')
        }
    },
}
</script>

<style>

</style>
