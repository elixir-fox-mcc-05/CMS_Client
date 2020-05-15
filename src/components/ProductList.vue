<template>
  <div class="product-container">
    <h1>Product List</h1>
    <div class="form-row search-filter">
      <div class="form-group col-md-4 input-group">
        <input type="text" class="form-control" id="product-search" v-model="productSearch" placeholder="Search Product">
        <div class="input-group-append">
          <span class="input-group-text clear-field"><i class="fas fa-times-circle" @click="clearField"></i></span>
        </div>
      </div>
      <div class="form-group col-md-4">
        <select id="product-category" class="form-control">
          <option selected>Choose Category</option>
          <option>...</option>
        </select>
      </div>
    </div>
    <div class="product-table">
      <Vuetable
        ref="vuetable"
        :api-url="apiAddress"
        :fields="fields"
        :sort-order="sortOrder"
        data-path="mydata"
        :per-page="10"
        :transform="transformData"
        :append-params="{ search: productSearch }"
        pagination-path="pagination"
        @vuetable:pagination-data="onPaginationData"
        :http-options="httpHeaders"
        :css="css.table"
      >
        <template slot="image" scope="props">
          <img
            :src="props.rowData.image_url"
            :alt="props.rowData.name"
            width="50"
            @click="enlargingImage(props.rowData.image_url, props.rowData.name)">
        </template>
        <template slot="action" scope="props">
          <router-link :to="`/editForm/${props.rowData.id}`">
            <button
              class="btn btn-warning"
              @click="showEditForm(props.rowData)">
              <span class="fas fa-edit"></span>
              Edit
            </button>
          </router-link>
          <button
            class="btn btn-danger"
            @click="deleteProduct(props.rowData.id, props.rowData.name, props.rowData)">
            <span class="fas fa-trash-alt"></span>
             Delete
          </button>
        </template>
      </Vuetable>
      <VuetablePagination ref="pagination" @vuetable-pagination:change-page="onChangePage" :css="css.pagination"></VuetablePagination>
    </div>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetableFieldSequence from 'vuetable-2/src/components/VuetableFieldSequence.vue'
import Swal from 'sweetalert2'
import accounting from 'accounting-js'
import _ from 'lodash'

export default {
  name: 'ProductList',
  components: {
    Vuetable, VuetablePagination
  },
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  data () {
    return {
      apiAddress: 'http://localhost:4000/products',
      productSearch: '',
      fields: [
        {
          name: VuetableFieldSequence,
          title: 'No.',
          width: '3%'
        },
        {
          name: 'name',
          title: 'Product Name',
          width: '30%',
          sortField: 'name'
        },
        {
          name: 'stock',
          title: 'Stock',
          width: '10%',
          sortField: 'stock'
        },
        {
          name: 'price',
          title: 'Price',
          width: '20%',
          sortField: 'price',
          formatter: (value) => {
            const price = +value
            return accounting.formatMoney(price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })
          }
        },
        {
          name: 'image',
          title: 'Product Image',
          width: '15%'
        },
        {
          name: 'action',
          title: 'Action',
          width: '20%'
        }
      ],
      sortOrder: [
        {
          field: 'name',
          sortField: 'name',
          direction: 'asc'
        }
      ],
      css: {
        table: {
          tableHeaderClass: 'header-style',
          tableBodyClass: 'body-text-style',
          tableClass: 'table table-bordered',
          ascendingIcon: 'fas fa-sort-up',
          descendingIcon: 'fas fa-sort-down',
          ascendingClass: 'sorted-asc',
          descendingClass: 'sorted-desc'
        },
        pagination: {
          infoClass: 'pull-left',
          wrapperClass: 'vuetable-pagination pull-right',
          activeClass: 'btn-primary',
          disabledClass: 'disabled',
          pageClass: 'btn btn-border',
          linkClass: 'btn btn-border',
          icons: {
            first: '',
            prev: '',
            next: '',
            last: ''
          }
        }
      }
    }
  },
  methods: {
    deleteProduct (id, productName, data) {
      const deleteWarn = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-lg btn-easygreen',
          cancelButton: 'btn btn-lg btn-reddish'
        },
        buttonsStyling: false
      })

      deleteWarn.fire({
        title: `Are you sure want to delete ${productName} ?`,
        text: 'Think twice, you may regret it',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, it\'s bad!',
        cancelButtonText: 'No, take me back !',
        reverseButtons: true
      })
        .then((result) => {
          if (result.value) {
            this.$store.commit('set_id', id)
            this.$store.dispatch('delete')
              .then(res => {
                deleteWarn.fire(
                  'deleted!',
                  'It\'s gone forever',
                  'success'
                )
                this.$refs.vuetable.refresh()
              })
              .catch(err => {
                Swal.fire({
                  icon: 'error',
                  title: 'There\'s an error occured',
                  text: `${err.response}`
                })
              })
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            deleteWarn.fire(
              'Cancelled',
              `${productName} is safe`,
              'info'
            )
          }
        })
    },
    showEditForm (product) {
      this.$store.commit('set_product', product)
    },
    enlargingImage (url, productName) {
      Swal.fire({
        text: `${productName}`,
        imageUrl: `${url}`,
        imageWidth: 400
      })
    },
    transformData (data) {
      var transformed = {}

      transformed.pagination = {
        total: data.products.length,
        per_page: 10,
        current_page: 1,
        // last_page: Math.ceil(this.total / this.per_page),
        next_page_url: 'http://localhost:4000/products?page=2',
        prev_page_url: null,
        from: 1
        // to: (this.current_page * this.per_page) + this.per_page
      }
      transformed.pagination.last_page = Math.ceil(transformed.pagination.total / transformed.pagination.per_page)
      transformed.pagination.total = (transformed.pagination.current_page * transformed.pagination.per_page) + transformed.pagination.per_page

      transformed.mydata = []

      for (var i = 0; i < data.products.length; i++) {
        transformed.mydata.push({
          id: data.products[i].id,
          name: data.products[i].name,
          image_url: data.products[i].image_url,
          price: data.products[i].price,
          stock: data.products[i].stock
        })
      }
      return transformed
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    clearField () {
      this.productSearch = ''
    },
    debounceSearch: _.debounce(function () {
      this.$refs.vuetable.refresh()
    }, 500)
  },
  computed: {
    httpHeaders () {
      return { headers: { access_token: localStorage.access_token } }
    }
  },
  watch: {
    productSearch (search) {
      this.debounceSearch()
    }
  }
}
</script>

<style>
  .search-filter {
    width: 100%;
    margin: 5px;
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
  }

  .table-style {
    border-collapse: collapse;
  }

  img:hover {
    cursor: pointer;
  }

  tHead {
    font-weight: 800;
    background-color: rgba(94, 243, 193, 0.5);
    color: rgb(255, 255, 255);
  }

  .body-text-style {
    font-weight: 600;
    text-align: center;
  }

  .product-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .product-table {
    width: 95%;
  }

  .btn {
    margin: 5px;
  }

  .btn-easygreen {
    background-color: rgb(150, 243, 56);
    color: white;
  }

  .btn-reddish {
    background-color: rgb(201, 37, 37);
    color: white;
  }

  .btn-easygreen:hover {
    background-color: rgb(86, 160, 13);
  }

  .btn-reddish:hover {
    background-color: rgb(243, 22, 52);
  }

  .fa-times-circle {
    color: rgb(243, 81, 6);
  }

  .fa-times-circle:hover {
    cursor: pointer;
  }
</style>
