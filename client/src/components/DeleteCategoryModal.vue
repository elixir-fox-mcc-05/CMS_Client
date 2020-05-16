<template>
  <b-modal :id="`delete-category`" title="Delete Category" :hide-footer="hideFooter">
    <b-form @submit.prevent="deleteCategory(category.id)">
      <b-form-group>
        Delete Category {{ category.name }} ?
      </b-form-group>
      <b-button type="submit" variant="danger">Delete</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import server from '../api'

export default {
  name: 'DeleteCategoryModal',
  data () {
    return {
      hideFooter: true
    }
  },
  props: {
    category: Object
  },
  methods: {
    deleteCategory (id) {
      server.delete(`/categories/${id}`, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.commit('SET_SUCCESS', 'Berhasil Menghapus Category')
          this.$root.$emit('bv::hide::modal', 'delete-category')
          setTimeout(() => {
            this.$store.commit('SET_SUCCESS', '')
          }, 2000)
          this.$store.dispatch('getCategories')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style>
</style>
