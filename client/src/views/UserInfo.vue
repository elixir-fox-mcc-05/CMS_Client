<template>
<div>
    Hello, {{userName}}
</div>
</template>

<script>
export default {
  name: 'UserInfo',
  data(){
    return {
      userName : localStorage.AccountName
    }
  }
}
</script>

<style>

</style>
