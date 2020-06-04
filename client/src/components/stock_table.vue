<template>
<div id="stock_table">
 <div id="table-wrapper" class="ui container">
   <h2><strong>Stock Items </strong> </h2>
   <div><vs-button color="primary" type="filled" to="/home/stock/addform">add stock</vs-button></div>
   <div v-show="loading" class="overlay flex flex-column items-center justify-center">
    <spinner size="large" message="loading..."></spinner>
  </div>
  <vuetable ref="vuetable"
     api-url="http://localhost:3000/product"
    :fields="fields"
    :sort-order="sortOrder"
    :css="css.table"
    pagination-path=""
    :per-page="10"
    @vuetable:pagination-data="onPaginationData"
    @vuetable:loading="onLoading"
    @vuetable:loaded="onLoaded"
  >
    <div slot="actions" slot-scope="props">
      <div class="table-button-container">
          <button class="btn btn-warning btn-sm" @click.prevent="editRow(props.rowData)">
            <span class="glyphicon glyphicon-pencil"></span> Edit</button>&nbsp;&nbsp;
          <button class="btn btn-danger btn-sm" @click.prevent="deleteRow(props.rowData)">
            <span class="glyphicon glyphicon-trash"></span> Delete</button>&nbsp;&nbsp;
      </div>
    </div>

      <div slot="image" slot-scope="props">
        <img :src="props.rowData.image_url" alt="" width="50" height="50">
      </div>
    </vuetable>
    <vuetable-pagination ref="pagination"
      :css="css.pagination"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
  </div>
</div>
</template>

<script>
import { Vuetable, VuetablePagination } from 'vuetable-2'
import axios from '../axios'
import _ from 'lodash'
import Spinner from 'vue-simple-spinner'
// import { log } from 'util'
// import { log } from 'util'
export default {
  name: 'stacktable',
  components: {
    Vuetable, VuetablePagination, Spinner
  },
  data () {
    return {
      dataitems: '',
      perPage: 10,
      loading: true,
      fields: [
        {
          name: 'name',
          title: '<span class="orange glyphicon glyphicon-user"></span> Full Name',
          sortField: 'name'
        },
        {
          name: 'image',
          title: 'Image',
          titleClass: 'text-center',
          dataClass: 'text-center',
          width: '15% '
        },
        // {
        //   name: 'image_url',
        //   title: 'image_url',
        //   sortField: 'image_url'
        // },
        'price',
        'stock',
        'createdAt',
        'updatedAt',
        {
          name: 'actions',
          title: 'Actions',
          titleClass: 'text-center',
          dataClass: 'text-center',
          width: '15% '
        }
      ],
      sortOrder: [
        { field: 'name', direction: 'asc' }
      ],
      css: {
        table: {
          tableClass: 'table table-striped table-bordered table-hovered',
          loadingClass: 'loading',
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down',
          handleIcon: 'glyphicon glyphicon-menu-hamburger'
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
  // watch: {
  //   dataitems (newVal, oldVal) {
  //     console.log('perubahan')
  //     this.$store.dispatch('fetchProduct')
  //   }
  // },
  computed: {
    // productsRefresh () {
    //   this.$store.state.products
    // }
    /* httpOptions(){
    return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
  }, */
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    editRow (rowData) {
      this.$router.push('/home/stock/editform/' + rowData.id)
    },
    deleteRow (rowData) {
      // alert('You clicked delete on' + JSON.stringify(rowData))
      axios({
        method: 'DELETE',
        url: '/product/' + rowData.id,
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.$store.dispatch('fetchProduct')
          this.dataitems = this.$store.state.products
          this.$refs.vuetable.refresh()
          this.$toasted.global.my_app_success({
            message: 'Succes Delete Item '
          })
        })
        .catch(err => {
          console.log(err)
          this.$toasted.global.my_app_error({
            message: err
          })
        })
    },
    onLoading () {
      this.loading = true
    },
    onLoaded () {
      this.loading = false
    },
    dataManager (sortOrder, pagination) {
      console.log('aaaaa', this.dataitems)
      if (this.dataitems.length < 1) return

      let local = this.dataitems

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        console.log('orderBy:', sortOrder[0].sortField, sortOrder[0].direction)
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        )
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      )
      // console.log('pagination:', pagination)
      const from = pagination.from - 1
      const to = from + this.perPage

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      }
    }
  },
  created () {
    // console.log('created')
    this.$store.dispatch('fetchProduct')
    this.dataitems = this.$store.state.products
    // this.$refs.vuetable.refresh()
    // console.log('created', this.dataitems, this.$store.state.products.data)
    axios({
      method: 'GET',
      url: '/product',
      headers: {
        token: localStorage.token
      }
    })
      .then(result => {
        this.dataitems = result.data.data
        console.log('ceated')
        console.log(this.dataitems)
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted () {
  }
}
</script>

<style>
#stock_table {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.orange.glyphicon {
  color: orange;
}

th.sortable {
  color: #ec971f;
}

.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
