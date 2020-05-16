<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
            <div class="row">
                <div class="nav-item">
                    <img alt="Brand logo" src="../../assets/logo.png">
                </div>
                <div class="nav-item col-4">
                    <router-link to="/">Home</router-link> |
                    <router-link to="/about">About</router-link>   
                </div>
                <div class="user">
                    <ul class="row">
                        <router-link to="/login"> <li v-if="!isLogin" class="nav-item">
                            <a
                            data-toggle="modal"
                            data-target="#loginModal"
                            class="nav-link sub active"                            
                            >Sign in</a>
                        </li> </router-link>
                        <li class="nav-item">
                            <div class="row">
                                <router-link to="/cart" class="nav-link" ><custom-icon name="shopping-cart" base-class="custom-icon"></custom-icon>
                            ({{$store.getters.cartItems}}) </router-link>
                            </div>
                        </li>
                    </ul>
                </div>                
            </div>            
        </div>
    </nav>
</template>

<script>
import { mapState } from "vuex";
import customIcon from 'vue-icon/lib/vue-feather.esm'

export default {
    name: 'Header',
    // data () {
    //     return {
    //         isLogin: false
    //     }
    // },
    components: {
        customIcon
    },
    computed: {
        ...mapState(['isLogin'])
    }
}
</script>

<style>
ul {
    list-style-type: none;
}
</style>