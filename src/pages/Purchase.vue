<template>
  <q-page padding>
    <div>
      <q-btn @click="getAvailableListings">getAvailableListings</q-btn>
    </div>
    <div v-for="(item, index) in items" :key="index">
      <pre>{{item}}</pre>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Purchase',
  data () {
    return {
      items: []
    }
  },
  methods: {
    async getAvailableListings () {
      const query = /* GraphQL */`
        query {
          store_available_listing {
            listing_id
            public_name
            description
            available_listing_products {
              product {
                public_name
                description
              }
              quantity
              price
              lifetime {
                public_name
                description
                start
                end
              }
            }
          }
        }
      `

      const { store_available_listing } = await this.$gql(query)

      this.items = store_available_listing
    },
    createPurchase () {

    },
    addListing () {

    },
    updateListing () {

    },
    removeListing () {

    },
    checkOut () {

    }
  }
}
</script>

<style>
</style>
