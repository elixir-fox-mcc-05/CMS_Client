
<template>
    <section>
        <b-table
            :data="isEmpty ? [] : categories"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :hoverable="isHoverable"
            :loading="isLoading"
            :focusable="isFocusable"
            :mobile-cards="hasMobileCards">

            <template slot-scope="temp">
                <b-table-column field="id" label="ID" width="40" numeric>
                    {{ temp.row.id }}
                </b-table-column>

                <b-table-column field="name" label="Name" :searchable="true">
                    {{ temp.row.name }}
                </b-table-column>

                <b-table-column label="Action">
                    <span>
                      <div class="buttons">
                         <b-button @click="showEditMenu(temp.row.id)" type="is-primary">Edit</b-button>
                          <b-button @click="deleteCategory(temp.row.id)" type="is-primary">Delete</b-button>
                          </div>
                    </span>
                </b-table-column>
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
        </b-table>
        <b-modal :active.sync="isComponentModalActive"
            has-modal-card full-screen :can-cancel="false">
             <form action="">
                <div class="modal-card" style="width: 50%">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Edit Category</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="name">
                            <b-input
                                v-model="name"
                                type="text"
                                :value="name"
                                placeholder="Category Name"
                                required>
                            </b-input>
                        </b-field>

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="close">Close</button>
                        <button class="button is-primary" @click.prevent="editCategory(selectId)">Edit Product</button>
                    </footer>
                </div>
            </form>
        </b-modal>
    </section>
</template>

<script>
import server from '@/api'
// import ProductCard from '@/components/ProductCard'
export default {

  name: 'ProductList',
  data () {
    return {
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,
      isComponentModalActive: false,
      selectId: 0,
      CategoryId: 0
    }
  },
  methods: {
    showEditMenu (id) {
      server.get(`/category/${id}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          // console.log(data.data)
          this.isComponentModalActive = true
          this.selectId = data.id
          this.name = data.name
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    editCategory (id) {
      console.log(id)
      console.log(this.selectId)
      const updatedData = {
        name: this.name
      }
      console.log(updatedData)
      server.put(`/category/edit/${id}`, updatedData, {
        headers: {
          token: localStorage.token
        },
        params: {
          id: this.selectId
        }
      })
        .then(({ data }) => {
          // this.$store.commit('SET_UPDATEPRODUCT',data)
          console.log('edit category completed')
          this.isComponentModalActive = false
          this.$store.dispatch('fetchCategory')
          this.$buefy.toast.open('Edit Category Completed')
          // .finally(_ => {
          //   this.data = this.$store.state.categories
          // })
        })
        .catch(err => {
          console.log(err.response.data)
          this.$buefy.snackbar.open({
            duration: 5000,
            message: err.response.data.error,
            type: 'is-danger',
            position: 'is-top',
            queue: true

          })
        })
    },
    deleteCategory (id) {
      server.delete(`/category/delete/${id}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('delete category completed')
          this.$buefy.toast.open('Delete Category Completed')
          this.fetchCategory()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    close () {
      this.isComponentModalActive = false
    },
    fetchCategory () {
      this.$store.dispatch('fetchCategory')
      // this.data = this.$store.state.categories
    }
  },
  created () {
    this.$store.dispatch('fetchCategory')
    // .finally(_ => {
    //   console.log('asd', this.$store.state.categories)
    //   this.data = this.$store.state.categories
    // })
  },
  computed: {
    categories () {
      return this.$store.getters.categories
    }
  }
}

</script>

<style>

</style>
