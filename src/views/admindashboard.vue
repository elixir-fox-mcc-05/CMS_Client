<template>
  <v-app>
    <b-col class="middle">
      <b-row class="middle" v-if="isLogin" style="padding-top:5px;">
        <b-container style="align-items:flex-end">
            <b-nav style="display:flex; flex-direction:row; padding-left:45%">
              <div class="nav-items" style='color:green;'>
                <b-button @click.prevent="addForm" variant="outline-primary" size="lg"><b-icon icon='plus-circle' variant="danger"></b-icon> add</b-button>
              </div>
              <div class="nav-items" style='color: grey;'>
                <b-button @click.prevent="addForm" variant="outline-primary" size="lg"><b-icon icon='screwdriver' variant="danger"></b-icon> edit</b-button>
              </div>
              <div class="nav-items" style="color:red;">
                <b-button @click.prevent="addForm" variant="outline-primary" size="lg"><b-icon icon='slash-circle' variant="danger"></b-icon> delete</b-button>
              </div>
            </b-nav>
        </b-container>
      </b-row>
      <b-container v-if="showAddForm">
        <b-form>
          <b-form-group
            id="input-group-1"
            label="Name :"
            label-for="input-1"
            description="Please Input Category Name"
          >
            <b-form-input
                id="input-1"
                v-model="name"
                type="text"
                required
                placeholder="Input Category Name"
              ></b-form-input>
          </b-form-group>
        </b-form>
      </b-container>
      <b-container>
        <category></category>
      </b-container>
    </b-col>
  </v-app>
</template>

<script>
import category from '@/components/category'
export default {
  name: 'adminDashboard',
  data () {
    return {
      name: '',
      showAddForm: false
    }
  },
  components: {
    category
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    Categories () {
      console.log(this.$store.state.categories)
      return this.$store.state.categories
    }
  },
  create () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN', true)
      this.$store.dispatch('fetchCategories', localStorage.token)
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    addForm () {
      switch (this.showAddForm) {
        case true :
          this.showAddForm = false
          break
        case false :
          this.showAddForm = true
          break
      }
    }
  }
}
</script>

<style scoped>
  .nav-items {
    padding: 5px;
  }
</style>
