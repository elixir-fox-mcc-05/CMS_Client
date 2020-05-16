<template>
  <div class="container">
      <div class="row">
          <div class="col-6" id="left">
              <div>
                  <h1 class="display-2">
                      Apple ID
                  </h1> <br>
                  <h3>
                      Official Apple Distributor di Indonesia.
                  </h3>
              </div>
          </div>
          <div class="col-4" id="right">
              <div>
                  <h1 class="display-4">
                      Admin Panel
                  </h1>
              </div> <br>
              <div v-if="errRes">
                  <div class="alert alert-danger">
                      <span> {{ errRes }} </span>
                  </div>
              </div>
                <form @submit.prevent="loginSubmit" id="from">
                    <div class="form-group">
                        <label>Username</label>
                        <div>
                            <input type="text" class="form-control" v-model="username" placeholder="Enter username">
                        </div>
                    </div>
                    <div class="form-group input-group">
                        <label for="">Password</label>
                        <div class="input-group">
                        <input :type="passInputType" v-model="password" class="form-control" placeholder="Enter password">
                        <div class="input-group-prepend">
                            <button class="btn" @click.prevent="changeType" id="btnShow" type="button">
                                <svg class="bi bi-eye" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 001.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0014.828 8a13.133 13.133 0 00-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 001.172 8z" clip-rule="evenodd"/>
                                    <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Submit</button>
                </form>
          </div>
      </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: "login",
    data () {
        return {
            username: '',
            password: '',
            passInputType: 'password',
            errRes: '',
            baseUrl: ''
        }
    },
    methods: {
        loginSubmit () {
            Axios({
                method: 'post',
                url: this.baseUrl+'/user/login',
                data: {
                    username: this.username,
                    password: this.password
                }
            })
            .then(result=>{
                localStorage.setItem('token',result.data.token)
                this.errRes = ''
                this.$router.push('/dashboard')
            })
            .catch(err=>{
                this.errRes = err.response.data.msg
            })
        },
        changeType () {
            if(this.passInputType === 'password') {
                this.passInputType = 'text'
            } else {
                this.passInputType = 'password'
            }
        }
    },
    created() {
        this.baseUrl = this.$store.state.baseUrl 
    }
}
</script>

<style>
    #left, #right {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
    }
    #from {
        width: 275px;
    }
    #btnShow {
        background: white;
        border: 1px solid lightgrey;
    }

</style>