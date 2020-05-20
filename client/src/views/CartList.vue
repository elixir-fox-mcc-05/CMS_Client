<template>
      <section>
        <b-table
            :data="isEmpty ? [] : carts"
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

                <b-table-column field="name" label="Name" searchable="true">
                    {{ temp.row.Product.name }}
                </b-table-column>

                <b-table-column field="buyer" label="Buyer">
                    {{ temp.row.User.first_name }} {{ temp.row.User.last_name }}
                </b-table-column>

                <b-table-column field="quantity" label="Quantity">
                    {{ temp.row.quantity }}
                </b-table-column>

                <b-table-column field="ispaid" label="isPaid">
                    {{ temp.row.isPaid }}
                </b-table-column>

                <b-table-column label="Action">
                    <span>
                      <div class="buttons">
                         <b-button @click="showEditMenu(temp.row.id)" type="is-primary">Edit</b-button>
                          <b-button @click="deleteCart(temp.row.id)" type="is-primary">Delete</b-button>
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
                        <p class="modal-card-title">Edit Cart</p>
                    </header>
                    <section class="modal-card-body">

                        <b-field label="Quantity">
                            <b-numberinput v-model="stock"></b-numberinput>
                        </b-field>

                         <div class="block">
                         <h1><strong>is paid ?</strong></h1><br>
            <b-radio v-model="isPaid"
                name="name"
                native-value="true">
                True
            </b-radio>
            <b-radio v-model="isPaid"
                name="name"
                native-value="false">
                False
            </b-radio>

        </div>

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="close">Close</button>
                        <button class="button is-primary" @click.prevent="edit(selectId)">Edit Cart</button>
                    </footer>
                </div>
            </form>
        </b-modal>
    </section>
</template>

<script>
import server from '@/api'

export default {
  name: 'CartList',
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
    fetchCart () {
      this.$store.dispatch('fetchCart')
      this.data = this.$store.state.carts
    },
    showEditMenu (id) {
      server.get(`/cart/${id}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          // console.log(data.data)
          this.isComponentModalActive = true
          this.selectId = data.data.id
          this.stock = data.data.quantity
          this.isPaid = data.data.isPaid
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteCart (id) {
      server.delete(`/cart/delete/${id}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('delete completed')
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    edit (id) {
      const editCart = {
        quantity: this.stock,
        isPaid: this.isPaid
      }

      server.put(`/cart/edit/${id}`, editCart, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('edit completed')
          this.$store.dispatch('fetchCart')
            .finally(_ => {
              this.isComponentModalActive = false
            })
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    close () {
      this.isComponentModalActive = false
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
    //   .finally(_ => {
    //     console.log('asd', this.$store.state.products)
    //     this.fetchCart()
    //   })
  },
  computed: {
    carts () {
      return this.$store.getters.carts
    }
  }
}
</script>

<style>
</style>
