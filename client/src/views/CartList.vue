<template>
      <section>
        <b-table
            :data="isEmpty ? [] : data"
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

                <b-table-column field="name" label="Name">
                    {{ temp.row.Product.name }}
                </b-table-column>

                <b-table-column field="buyer" label="Buyer">
                    {{ temp.row.User.first_name }} {{ temp.row.User.last_name }}
                </b-table-column>

                <b-table-column field="stock" label="Stock">
                    {{ temp.row.stock }}
                </b-table-column>

                <b-table-column field="ispaid" label="isPaid">
                    {{ temp.row.isPaid }}
                </b-table-column>

                <b-table-column label="Action">
                    <span>
                      <div class="buttons">
                         <b-button @click="showEditMenu(temp.row.id)" type="is-primary">Edit</b-button>
                          <b-button @click="deleteProduct(temp.row.id)" type="is-primary">Delete</b-button>
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
                        <p class="modal-card-title">Edit Product</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="name">
                            <b-input
                                v-model="name"
                                type="text"
                                :value="name"
                                placeholder="Product Name"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Image URL">
                            <b-input
                                v-model="image_url"
                                type="text"
                                :value="image_url"
                                placeholder="Image URL"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Stock">
                            <b-input
                                v-model="stock"
                                type="text"
                                :value="stock"
                                placeholder="Stock"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Price">
                            <b-input
                                v-model="price"
                                type="text"
                                :value="price"
                                placeholder="Price"
                                required>
                            </b-input>
                        </b-field>

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="close">Close</button>
                        <button class="button is-primary" @click.prevent="edit(selectId)">Edit Product</button>
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
    const data = this.$store.state.carts
    return {
      data,
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

  },
  created () {

  }
}
</script>

<style>
</style>
