<template>
  <b-modal :id="`edit-category`" title="Edit Category" :hide-footer="hideFooter">
    <b-form @submit.prevent="editCategory(category.id)">
      <b-form-group>
        <b-form-input
            id="name"
            v-model="category.name"
            required
            placeholder="Category Name"
          ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import server from '../api'

export default {
  name: 'EditCategoryModal',
  props: {
    category: Object
  },
  data () {
    return {
      hideFooter: true
    }
  },
  methods: {
    editCategory (id) {
      server.put(`/categories/${id}`, {
        name: this.category.name
      }, {
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.commit('SET_SUCCESS', 'Berhasil Mengubah Category')
          this.$root.$emit('bv::hide::modal', 'edit-category')
          setTimeout(() => {
            this.$store.commit('SET_SUCCESS', '')
          }, 5000)
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
