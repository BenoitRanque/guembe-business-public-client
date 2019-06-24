<template>
  <q-page padding style="max-width: 800px; margin: 0 auto">
    <q-list>
      <q-item
        v-for="(listing, index) in listings"
        :key="index"
        clickable
        :to="`/webstore/listing/${listing.listing_id}`"
      >
        <q-item-section>
          <q-item-label :lines="1">
            {{$i18n(listing, 'name')}}
          </q-item-label>
          <q-item-label caption :lines="2">
            {{$i18n(listing, 'description')}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          BS {{getListingPrice(listing.total)}}
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
      slide: 0,
      loading: false,
      listings: []
    }
  },
  methods: {
    getListingPrice (total) {
      return (total / 100).toFixed(2)
    },
    // getListingPrice (listing) {
    //   return listing.listing_products.reduce((subtotal, { price, quantity }) => subtotal + ((price / 100) * quantity), 0).toFixed(2)
    // },
    async loadAvailableListings () {
      const query = /* GraphQL */`
        query {
          listings: webstore_listing {
            listing_id
            i18n (where: { locale_id: { _eq: "es" } }) {
              name
              description
            }
            total
            inventory {
              available
            }
          }
        }
      `
      try {
        this.loading = true

        const { listings, highlighted } = await this.$gql(query)
        this.highlighted = highlighted
        this.listings = listings
      } catch (error) {
        console.error(error)
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

<style lang="stylus">
  .q-img > .q-img__image[style*="data:image"]
    filter blur(0.25vw)
  // .q-img > .q-img__image[style*="http"]
  //   filter blur(0.25vw)
  // .q-img > .q-img__content
  //   backdrop-filter blur(2vw)
    // transform scale(1.05)
</style>
