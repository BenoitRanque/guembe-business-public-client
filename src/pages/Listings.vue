<template>
  <q-page padding style="max-width: 800px; margin: 0 auto">
    <div v-if="highlighted.length"  style="heigh: 0; overflow: hidden; padding-top: 50%;" class="relative-position q-mb-md">
      <div class="fit absolute-top-left">
        <q-carousel
          keep-alive
          animated
          v-model="slide"
          height="100%"
          :autoplay="10000"
          :arrows="highlighted.length > 1"
          :infinite="highlighted.length > 1"
          :navigation="highlighted.length > 1"
        >
          <q-carousel-slide
            class="q-pa-none cursor-pointer"
            v-for="(image, index) in highlighted"
            :key="`slide_${index}`"
            :name="index"
            @click="$router.push(`/listing/${image.listing.listing_id}`)"
          >
            <q-img
              :src="$imgUrl.listing.src(image.image_id)"
              :srcset="$imgUrl.listing.srcset(image.image_id)"
              sizes="(min-width: 800px) 800px, 100vw"
              :placeholder-src="image.placeholder"
            >
              <template v-slot:loading></template>
            </q-img>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
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
      slide: 0,
      loading: false,
      listings: [],
      highlighted: []
    }
  },
  methods: {
    getListingPrice (listing) {
      return listing.listing_products.reduce((subtotal, { price, quantity }) => subtotal + ((price / 100) * quantity), 0).toFixed(2)
    },
    async loadAvailableListings () {
      const query = /* GraphQL */`
        query {
          highlighted: store_listing_image (where: { highlighted: { _eq: true }, listing: { available_listing: {} } }) {
            name
            image_id
            placeholder
            listing {
              listing_id
              public_name
              description
              listing_products {
                quantity
                price
              }
            }
          }
          listings: store_listing (where: { available_listing: { listing_id: { _is_null: false } } }) {
            listing_id
            public_name
            description
            listing_products {
              quantity
              price
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
