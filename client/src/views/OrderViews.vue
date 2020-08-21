<template>
    <div>
        <topNavbar></topNavbar>
        <div class="container-fluid">
            <div class="row">
                <sidebarMenu></sidebarMenu>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 class="h2">Orders</h1>
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click.prevent="addProductBtn">
                                Add Product
                            </button>
                        </div>
                    </div>
                    <h1 class="display1">
                        You dont' have any Orders
                    </h1>
                    <div class="alert alert-warning">
                            this feature will be aviable when the customers client side is deployed
                    </div>
                </main>
            </div>
        </div>
  </div>
</template>

<script>
import topNavbar from '../components/topNavbar'
import sidebarMenu from '../components/Navbar'

export default {
    components: {
        topNavbar,
        sidebarMenu
    }
}
</script>

<style>

</style>