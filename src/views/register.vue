<template>
  <div class="register" style="justify-content:center;">
    <div class = "form-style" style="font-size : 22px;">
      <div style="padding-bottom:15px;">
          Register Form
          <p style="font-size:15px;">!click on icon to show password</p>
      </div>
      <div v-if="message" style="font-size : 15px !important; color: red;">
          {{message}}
      </div>
      <div v-if="messageSucces" style="font-size : 15px !important; color: red;">
          {{messageSucces}}
      </div>
      <div style="font-size : 20px !important;">
        <form action="" style="display:flex; flex-direction:column; justify-content:space-between; max-width:850px;margin:auto;">
            <div style="display:flex; flex-direction:row">
              <b-input-group size="lg">
                <b-input-group-prepend is-text>
                  <b-icon :icon="fillingname"></b-icon>
                </b-input-group-prepend>
                <b-form-input @focus="fillingname = 'person-fill'" @blur="fillingname = 'person'" v-model="name" type="text" placeholder="Your Full Name"></b-form-input>
              </b-input-group>
              <b-input-group size="lg">
                <b-input-group-prepend is-text>
                  <b-icon @click.prevent="showPassword" :icon="icon" style="cursor:pointer;"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="password" :type="type" placeholder="Your Password"></b-form-input>
              </b-input-group>
            </div>
            <div style="display:flex; flex-direction:row">
              <b-form-group>
                <b-input-group size="lg">
                  <b-input-group-prepend is-text>
                    <b-icon @click.prevent="showPassword" :icon="icon" size="h5 mb-2" style="cursor:pointer;"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input v-model="confirmPassword" :type="type" placeholder="Confirm Password"></b-form-input>
                </b-input-group>
              </b-form-group>
              <div>
                <b-input-group size="lg">
                  <b-input-group-prepend is-text>
                    <b-icon :icon="fillingEmail"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input v-model="email" @focus="fillingEmail = 'envelope-fill'" @blur="fillingEmail = 'envelope'" type="email" placeholder="me@example.com"></b-form-input>
                </b-input-group>
              </div>
            </div>
            <div>
                <button @click.prevent ="register" type="submit" class="btn btn-primary btn-xs btn-block">Submit</button>
                <button @click.prevent="hide" class="btn btn-primary btn-xs btn-block">Close</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      type: 'password',
      icon: 'eye',
      fillingname: 'person',
      fillingEmail: 'envelope'
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
  #regisForm {
    width: 100%;
  }
</style>
