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
        <select id="product-category" class="form-control" v-model="productCategory">
              <option selected value="">Choose Category</option>
              <option v-for="category in $store.state.categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
      </div>
    </div>
    <div class="small">
      <h6>*Click image to enlarge!</h6>
    </div>
    <Origami v-if="$store.state.isLoading" class="mb-3" :size="$store.state.loaderSize"></Origami>
    <div class="product-table">
      <Vuetable
        v-show="!$store.state.isLoading"
        ref="vuetable"
        :api-url="apiAddress"
        :fields="fields"
        :sort-order="sortOrder"
        data-path="mydata"
        :per-page="10"
        :transform="transformData"
        :append-params="{ search: productSearch, categoryId: productCategory }"
        pagination-path="pagination"
        @vuetable:pagination-data="onPaginationData"
        @vuetable:loading="onLoading"
        @vuetable:loaded="onLoaded"
        :http-options="httpHeaders"
        :css="css.table"
      >
        <template slot="image" scope="props">
          <img
            :src="props.rowData.image_url"
            :alt="props.rowData.name"
            width="80"
            @click="enlargingImage(props.rowData.image_url, props.rowData.name)">
        </template>
        <template slot="action" scope="props">
          <router-link :to="`/editForm/${props.rowData.id}`">
            <button
              class="btn btn-warning btn-sm"
              @click="showEditForm(props.rowData)">
              <span class="fas fa-edit"></span>
            </button>
          </router-link>
          <button
            class="btn btn-danger btn-sm"
            @click="deleteProduct(props.rowData.id, props.rowData.name, props.rowData)">
            <span class="fas fa-trash-alt"></span>
          </button>
        </template>
      </Vuetable>
      <div class="d-flex justify-content-between bg-light p-2">
        <vuetable-pagination-info
          v-show="!$store.state.isLoading"
          ref="paginationInfo"
          :css="css.pagination"
          info-class="pull-left"
        ></vuetable-pagination-info>
        <VuetablePagination
          v-show="!$store.state.isLoading"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
          :css="css.pagination"
        ></VuetablePagination>
      </div>
    </div>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import VuetableFieldSequence from 'vuetable-2/src/components/VuetableFieldSequence.vue'
import Swal from 'sweetalert2'
import accounting from 'accounting-js'
import _ from 'lodash'
import { Origami } from 'vue-loading-spinner'

export default {
  name: 'ProductList',
  components: {
    Vuetable, VuetablePagination, VuetablePaginationInfo, Origami
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
      apiAddress: 'https://secret-tundra-12625.herokuapp.com/products',
      productSearch: '',
      productCategory: '',
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
          width: '8%',
          sortField: 'stock'
        },
        {
          name: 'price',
          title: 'Price',
          width: '15%',
          sortField: 'price',
          formatter: (value) => {
            const price = +value
            return accounting.formatMoney(price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })
          }
        },
        {
          name: 'category',
          title: 'Category',
          width: '15%'
        },
        {
          name: 'image',
          title: 'Product Image*',
          width: '15%'
        },
        {
          name: 'action',
          title: 'Action',
          width: '25%'
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
          descendingClass: 'sorted-desc',
          sortableIcon: 'fas fa-sort'
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
            this.$store.dispatch('delete', id)
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
                  text: `${err.response.data.error}`
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
        total: data.products.total,
        per_page: data.products.per_page,
        current_page: data.products.current_page,
        last_page: data.products.last_page,
        from: data.products.from,
        to: data.products.to
      }

      if (transformed.pagination.current_page === transformed.pagination.last_page) {
        transformed.pagination.next_page_url = null
      } else {
        transformed.pagination.next_page_url = `${this.apiAddress}?page=${transformed.pagination.current_page + 1}`
      }

      if (transformed.pagination.current_page === 1) {
        transformed.pagination.prev_page_url = null
      } else {
        transformed.pagination.prev_page_url = `${this.apiAddress}?page=${transformed.pagination.current_page - 1}`
      }

      transformed.mydata = []

      for (var i = 0; i < data.products.data.length; i++) {
        transformed.mydata.push({
          id: data.products.data[i].id,
          name: data.products.data[i].name,
          image_url: data.products.data[i].image_url,
          price: data.products.data[i].price,
          stock: data.products.data[i].stock,
          categoryId: data.products.data[i].Category.id,
          category: data.products.data[i].Category.name
        })
      }
      return transformed
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    clearField () {
      this.productSearch = ''
    },
    onLoading () {
      this.$store.commit('set_loading_status', true)
    },
    onLoaded () {
      this.$store.commit('set_loading_status', false)
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
    },
    productCategory (category) {
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

  .small {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    padding-right: 50px;
  }
</style>
