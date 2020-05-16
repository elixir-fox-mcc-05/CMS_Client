<template>
  <div class="d-flex justify-content-around flex-wrap">
    <div>
      <b-jumbotron>
        <template v-slot:header>Welcome back,</template>

        <template v-slot:lead>
          <p>E-Commerce CMS, version {{ version }}</p>
        </template>

        <hr class="my-4" />

        <p>
          This is an admin dashboard page, you can fetch, create, update, delete
          your product.
        </p>

        <b-button variant="primary" href="#products"
          >your product list</b-button
        > |
        <b-button variant="success" v-b-modal.modal-create>Add New Product</b-button>

        <b-modal id="modal-create" ref="modal-create" title="Create a new product">
          <FormCreateProduct @closeModal="closeModal" />
          <template v-slot:modal-footer>
            <div class="w-100 h-auto"></div>
          </template>
        </b-modal>
      </b-jumbotron>
    </div>
    <div>
      <br />
      <b-calendar
        :date-format-options="{
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          weekday: 'short'
        }"
        locale="en"
        hide-header
      ></b-calendar>
    </div>
  </div>
</template>

<script>
import FormCreateProduct from '@/components/forms/FormCreateProduct'

export default {
  name: 'DashboardHeader',
  components: {
    FormCreateProduct
  },
  methods: {
    closeModal () {
      this.$refs['modal-create'].hide()
    }
  },
  computed: {
    version () {
      return this.$store.state.version
    },
    date () {
      const date = new Date()
      const d = date.getDate()
      const m = date.getMonth() + 1
      const y = date.getFullYear()
      return (
        (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y + ''
      )
    }
  }
}
</script>

<style></style>
