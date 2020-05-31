<template>
  <div class="category-container">
    <h1 class="mb-3">Category List</h1>
    <Origami v-if="$store.state.isLoading" class="mb-3" :size="$store.state.loaderSize"></Origami>
    <div class="category-table">
      <Vuetable
        v-show="!$store.state.isLoading"
        ref="vuetable"
        api-url="https://secret-tundra-12625.herokuapp.com/categories/"
        :fields="fields"
        :sort-order="sortOrder"
        data-path="categories"
        pagination.path=""
        :http-options="httpHeaders"
        :css="css.table"
        @vuetable:loading="onLoading"
        @vuetable:loaded="onLoaded"
      >
        <template slot="action" scope="props">
          <button
            class="btn btn-warning"
            @click="editCategory(props.rowData)">
            <span class="fas fa-edit"></span>
            Edit
          </button>
          <button
            class="btn btn-danger"
            @click="deleteCategory(props.rowData.id, props.rowData.name)">
            <span class="fas fa-trash-alt"></span>
              Delete
          </button>
        </template>
      </Vuetable>
    </div>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetableFieldSequence from 'vuetable-2/src/components/VuetableFieldSequence.vue'
import Swal from 'sweetalert2'
import { Origami } from 'vue-loading-spinner'

export default {
  name: 'CategoryList',
  components: {
    Vuetable, Origami
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
      fields: [
        {
          name: VuetableFieldSequence,
          title: 'No.',
          width: '5%'
        },
        {
          name: 'name',
          title: 'Category Name',
          width: '40%',
          sortField: 'name'
        },
        {
          name: 'total_product',
          title: 'Amount of Products',
          width: '25%',
          sortField: 'total_product'
        },
        {
          name: 'action',
          title: 'Action',
          width: '30%'
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
        }
      }
    }
  },
  methods: {
    editCategory (data) {
      Swal.fire({
        title: 'Edit Category Name',
        input: 'text',
        inputValue: data.name,
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Edit Category'
      })
        .then(result => {
          if (result.value) {
            const editedCategory = {
              name: result.value,
              id: data.id
            }
            this.$store.dispatch('editCategory', editedCategory)
              .then(({ data }) => {
                Swal.fire(
                  'Edited!',
                  `${result.value} successfully Edited`,
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
            Swal.fire(
              'Cancelled',
              'No category is modified',
              'info'
            )
          }
        })
    },
    deleteCategory (id, name) {
      const deleteWarn = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-lg btn-easygreen',
          cancelButton: 'btn btn-lg btn-reddish'
        },
        buttonsStyling: false
      })

      deleteWarn.fire({
        title: `Are you sure want to delete ${name} ?`,
        text: 'Think twice, all related product with this category will be deleted too. You may regret it',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, I\'am sure!',
        cancelButtonText: 'No, take me back !',
        reverseButtons: true
      })
        .then((result) => {
          if (result.value) {
            this.$store.dispatch('deleteCategory', id)
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
              `${name} is safe`,
              'info'
            )
          }
        })
    },
    onLoading () {
      this.$store.commit('set_loading_status', true)
    },
    onLoaded () {
      this.$store.commit('set_loading_status', false)
    }
  },
  computed: {
    httpHeaders () {
      return { headers: { access_token: localStorage.access_token } }
    }
  }
}
</script>

<style>
  .category-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .category-table {
    width: 85%;
  }
</style>
