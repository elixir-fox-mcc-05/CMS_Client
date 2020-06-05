<template>
  <div>
    <div>
      <h3><font-awesome-icon icon="users" /> Registered Users (total: {{ totalUsers }})</h3>
      <b-row>
        <b-col lg="3" class="my-1">
          <b-form-group
            label="Filter"
            label-cols-sm="2"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col lg="3" class="my-1">
          <b-form-group
            label="Per page"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        id="users"
        class="table"
        bordered="bordered"
        head-variant="dark"
        tbody-tr-class="text-center text-justify"
        tbody-td-class="align-middle"
        thead-tr-class="text-center text-justify"
        :items="users"
        :fields="fields"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        responsive="md"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template v-slot:cell(id)="data">
          <b-button variant="danger" @click="showMsgBoxDelete(data.value)"><font-awesome-icon icon="user-slash" /> Ban</b-button>
        </template>
      </b-table>
    </div>
    <div class="d-flex justify-content-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableUser',
  props: ['perPage', 'pageOptions'],
  data () {
    return {
      show: false,
      bordered: true,
      filter: null,
      currentPage: 1,
      sortBy: 'id',
      sortDesc: true,
      fields: [
        { key: 'Name', sortable: true },
        { key: 'Email', sortable: false },
        { key: 'id', label: 'Options' }
      ],
      boxDelete: ''
    }
  },
  methods: {
    fetchUsers () {
      this.$store
        .dispatch('fetchUsers')
        .then(({ data }) => {
          this.$store.commit('SET_USERS', data.Users)
        })
        .catch(({ err }) => {
          console.log(err)
        })
    },
    showMsgBoxDelete (id) {
      this.boxDelete = ''
      this.$bvModal.msgBoxConfirm('Please confirm that you want to ban?', {
        title: 'Please confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          this.boxDelete = value
          if (value === true) {
            this.banUser(id)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    banUser (id) {
      this.$store
        .dispatch('banUser', id)
        .then(({ data }) => {
          const bannedUserName = data.BannedUser.name
          this.fetchUsers()
          this.$swal.fire(
            `Success ban "${bannedUserName}"`,
            'You just banned a user!',
            'success'
          )
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    users () {
      const users = []
      this.$store.state.users.forEach(el => {
        users.push({
          Name: el.name,
          Email: el.email,
          id: el.id
        })
      })
      return users
    },
    totalUsers () {
      return this.$store.state.users.length
    },
    rows () {
      return this.users.length
    }
  },
  created () {
    this.fetchUsers()
  }
}
</script>

<style>
.table > tbody > tr > td {
     vertical-align: middle;
     background-color: rgba(0, 0, 0, 0.020);
}
</style>
