<template>
  <q-page padding>
    <!-- content -->
    <q-table
      :data="table.data"
    >

    </q-table>
  </q-page>
</template>

<script>
export default {
  name: 'Listing',
  data () {
    return {
      table: {
        data: []
      }
    }
  }
}
</script>

<style>
</style>
