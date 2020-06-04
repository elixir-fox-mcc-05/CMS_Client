<template>
<b-navbar type="is-light" spaced="true" shadow="true">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="@/assets/e-commerce.png"
                    alt="e-commerce"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#" >
                Home
            </b-navbar-item>
            <b-navbar-item href="#" @click.prevent="$router.push('/about')">
                About
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <button class="button is-medium is-rounded" @click.prevent="opengitHub">
                        <span class="icon is-medium">
                        <i class="fab fa-github"></i>
                        </span>
                        <span>GitHub</span>
                    </button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    opengitHub () {
      window.open('https://github.com/laevenx')
    }
  }
}
</script>

<style>

</style>
