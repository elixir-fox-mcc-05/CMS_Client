<template>
  <div class="container">
    <h1>Category List</h1>
    <p class="text-success" v-if="successMessage">{{ successMessage }}</p>
    <table class="table table-bordered text-center">
      <thead>
        <th>No.</th>
        <th>Nama Kategori</th>
        <th colspan="2">Action</th>
      </thead>
      <tbody>
        <tr v-for="(category,index) in categories" :key="category.id">
          <td>{{ index += 1 }}</td>
          <td>{{ category.name }}</td>
          <td><b-button variant="primary" @click.prevent="showEdit(category)"><i class="fa fa-edit"></i> Edit</b-button> <b-button variant="danger" @click.prevent="showDelete(category)"><i class="fa fa-trash"></i> Delete</b-button></td>
        </tr>
      </tbody>
    </table>
    <EditCategoryModal :category="category" />
    <DeleteCategoryModal :category="category" />
  </div>
</template>

<script>
import DeleteCategoryModal from '@/components/DeleteCategoryModal.vue'
import EditCategoryModal from '@/components/EditCategoryModal.vue'

export default {
  name: 'CategoryList',
  components: {
    DeleteCategoryModal,
    EditCategoryModal
  },
  data () {
    return {
      category: {}
    }
  },
  methods: {
    showEdit (category) {
      this.category = category
      this.$root.$emit('bv::show::modal', 'edit-category')
    },
    showDelete (category) {
      this.category = category
      this.$root.$emit('bv::show::modal', 'delete-category')
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    successMessage () {
      return this.$store.state.successMessage
    }
  },
  created () {
    if (localStorage.userRole !== 'admin') {
      this.$router.push({ name: 'Forbidden' })
    }
  }
}
</script>

<style>

</style>
