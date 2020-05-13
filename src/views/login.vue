<template>
  <div class='Login'>
    <div class = "form-style" style="height: inherit;">
      <div>
        <h2>Login Form</h2>
      </div>
      <div v-if="message" style="font-size : 15px !important; color: red;">
        {{message}}
      </div>
      <div style="padding-top:10px">
        <form id="loginForm" method="post">
          <b-input-group size="lg">
            <b-input-group-prepend is-text>
              <b-icon :icon="fillingEmail"></b-icon>
            </b-input-group-prepend>
            <b-form-input v-model="email" @focus="fillingEmail = 'envelope-fill'" @blur="fillingEmail = 'envelope'" type="email" placeholder="me@example.com"></b-form-input>
          </b-input-group>
          <b-input-group size="lg">
            <b-input-group-prepend is-text>
              <b-icon @click.prevent="showPassword" :icon="icon" style="cursor:pointer;"></b-icon>
            </b-input-group-prepend>
            <b-form-input v-model="password" :type="type" placeholder="Your Password"></b-form-input>
          </b-input-group>
          <div style="display:flex; justify-content:space-around; align-items:center; padding-top:10px;">
            <button @click.prevent ="login" class="btn btn-primary"> Submit</button>
            <button @click.prevent="hide" class="btn btn-primary">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      icon: 'eye',
      fillingEmail: 'envelope',
      type: 'password'
    }
  },
  methods: {
    showPassword () {
      this.type === 'password' ? this.type = 'text' : this.type = 'password'
      this.icon === 'eye' ? this.icon = 'eye-fill' : this.icon = 'eye'
    }
  }
}
</script>

<style scoped>
  .form-style {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 15px;
    justify-content: center;
    align-items: center;
  }
  #loginForm {
    width: 100%;
  }
</style>
