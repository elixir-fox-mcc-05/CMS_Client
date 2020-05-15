
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

            <template slot-scope="data">
                <b-table-column field="id" label="ID" width="40" numeric>
                    {{ data.row.id }}
                </b-table-column>

                <b-table-column field="first_name" label="First Name">
                    {{ data.row.first_name }}
                </b-table-column>

                <b-table-column field="last_name" label="Last Name">
                    {{ data.row.last_name }}
                </b-table-column>

                <b-table-column field="stock" label="Stock">
                    {{ data.row.stock }}
                </b-table-column>

                <b-table-column field="price" label="Price">
                    {{ data.row.price }}
                </b-table-column>

                <b-table-column label="Action">
                    <span>
                      <div class="buttons">
                         <b-button type="is-primary">Edit</b-button>
                          <b-button type="is-primary">Delete</b-button>
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
    </section>
</template>

<script>
// import ProductCard from '@/components/ProductCard'

export default {
  name: 'ProductList',
  components: {

  },
  data () {
    const data = [
      { id: 1, first_name: 'Jesse', last_name: 'Simmons', stock: 6, price: 10000, gender: 'Male' },
      { id: 2, first_name: 'John', last_name: 'Jacobs', stock: 6, price: 10000, gender: 'Male' },
      { id: 3, first_name: 'Tina', last_name: 'Gilbert', stock: 6, price: 10000, gender: 'Female' },
      { id: 4, first_name: 'Clarence', last_name: 'Flores', stock: 6, price: 10000, gender: 'Male' },
      { id: 5, first_name: 'Anne', last_name: 'Lee', stock: 6, price: 10000, gender: 'Female' }
    ]
    return {
      data,
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true

    }
  },
  methods: {
    edit (id) {
      this.$store.dispatch('login')
        .then(({ data }) => {
          console.log('masuk')
          this.$router.push({ name: 'Menu' })
        })
    },
    delete (id) {
      this.$store.dispatch('login')
        .then(({ data }) => {
          console.log('masuk')
          this.$router.push({ name: 'Menu' })
        })
    }
  }
}

</script>

<style>

</style>
