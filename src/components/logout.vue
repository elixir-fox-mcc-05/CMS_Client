<template>
    <div></div>
</template>
<script>
export default {
    name : 'Logout',
    created : function(){
        this.$store.dispatch('clearUserInfo').then( () => {
            localStorage.clear();
            this.$router.push(`/`)
        })
    }
}
</script>

<style>

</style>