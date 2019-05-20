<template>
  <q-page padding style="max-width: 800px; margin: 0 auto">
    <available-listing v-if="listing" :listing="listing">

    </available-listing>
    <!-- <listing-display v-if="listing" :listing="listing" class="q-shadow-none">
      <template v-slot:footer>
        <q-separator></q-separator>
        <q-card-section class="row">
          <q-space></q-space>
          <q-input v-model="addToCartAmount" label="Cantidad a Aggregar" dense square outlined class="col-auto q-mx-xs"></q-input>
          <q-btn @click="addToCurrentPurchase" color="primary" class="col-auto">Aggregar a Carrito</q-btn>
        </q-card-section>
      </template>
    </listing-display>
    <q-inner-loading :showing="loading">
      <q-spinner></q-spinner>
    </q-inner-loading> -->
  </q-page>
</template>

<script>
import AvailableListing from 'components/AvailableListing'

export default {
  name: 'Listing',
  components: {
    AvailableListing
  },
  props: {
    ListingId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      listing: null,
      addToCartAmount: 1
    }
  },
  methods: {
    async loadListing (ListingId) {
      const query = /* GraphQL */`
        query ($listing_id: uuid!) {
          listing: store_listing_by_pk (listing_id: $listing_id) {
            listing_id
            public_name
            description
            listing_images {
              image_id
              placeholder
              name
            }
            listing_products {
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
                lifetime_weekdays (order_by: [{weekday: { weekday_id: asc } }]) {
                  weekday {
                    weekday_id
                    description
                  }
                }
              }
            }
          }
        }
      `

      const variables = {
        listing_id: ListingId
      }

      try {
        this.loading = true

        const { listing } = await this.$gql(query, variables)

        this.listing = listing
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.loadListing(this.ListingId)
  }
}
</script>

<style>
</style>
