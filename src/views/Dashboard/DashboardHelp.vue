<template>
  <div>
    <div class="d-flex justify-content-around">
      <img src="@/assets/help.jpg" />
    </div>

    <table class="table table-hover table-bordered text-center">
      <thead class="thead-dark">
        <tr>
          <th width="200px">Action</th>
          <th>What does it mean and how to use it? for what purpose?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <b-button variant="success"
              ><font-awesome-icon icon="box-open" /> Add new product</b-button
            >
          </td>
          <td>
            Inside the dashboard's header, there is a green button that will
            toggle a form to add a new product. To add a new product, you should
            provide the product's name, image url that contains a good image,
            product's price, and stock. The product will be created after you
            click Submit.
          </td>
        </tr>
        <tr>
          <td>
            <b-button variant="warning"
              ><font-awesome-icon icon="edit" /> Edit</b-button
            >
          </td>
          <td>
            In the product's table, you will see a yellow button to update or
            edit your product, it will toggle a form to edit a product that you
            already added before. You can easly edit something that you want to
            edit, simply by evaluate the value inside the form. The product will
            be updated after you click Submit.
          </td>
        </tr>
        <tr>
          <td>
            <b-button variant="danger"
              ><font-awesome-icon icon="trash-alt" /> Delete</b-button
            >
          </td>
          <td>
            Next to an edit button, there is a red button, this button have a
            function delete or remove a product. The product will be deleted
            after you click YES in the confirmation dialog, to cancel the
            operation simply choose NO.
          </td>
        </tr>
        <tr>
          <td>
            <b-button variant="danger"
              ><font-awesome-icon icon="user-slash" /> Ban</b-button
            >
          </td>
          <td>
            If you go to the users route, you will see the red Ban's button
            inside an action column in the user's table. This button have a
            function to delete a user. The user will be banned after you click
            YES in the confirmation dialog, to cancel the operation simply
            choose NO.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DashboardHelp'
}
</script>

<style></style>
