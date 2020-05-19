<template>
  <div>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'Landing',
  components: {
    LoginForm
  },
  created () {
    if (localStorage.token) {
      this.$router.push({ name: 'MainPage' })
    }
  }
}
</script>
