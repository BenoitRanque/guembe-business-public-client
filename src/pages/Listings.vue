<template>
  <q-page padding>
    <!-- content -->
    <q-list>
      <q-item
        v-for="(listing, index) in listings"
        :key="index"
        clickable
        :to="`/listing/${listing.listing_id}`"
      >
        <q-item-section>
          <q-item-label :lines="1">
            {{listing.public_name}}
          </q-item-label>
          <q-item-label caption :lines="2">
            {{listing.description}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          BS {{getListingPrice(listing)}}
        </q-item-section>
      </q-item>
    </q-list>
    <q-inner-loading :showing="loading">
      <q-spinner></q-spinner>
    </q-inner-loading>
  </q-page>
</template>

<script>
export default {
  name: 'Listings',
  data () {
    return {
      loading: false,
      listings: []
    }
  },
  methods: {
    getListingPrice (listing) {
      return listing.products.reduce((subtotal, { price, quantity }) => subtotal + ((price / 100) * quantity), 0).toFixed(2)
    },
    async loadAvailableListings () {
      const query = /* GraphQL */`
        query {
          listings: store_available_listing {
            listing_id
            public_name
            description
            products: available_listing_products {
              product {
                public_name
                description
              }
              quantity
              price
            }
          }
        }
      `
      try {
        this.loading = true

        const { listings } = await this.$gql(query)
        this.listings = listings
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.loadAvailableListings()
  }
}
</script>

<style>
</style>
