<template>
  <listing-display :listing="listing" v-bind="$attrs">
    <template v-slot:header v-if="listing.listing_images.length">
      <div style="heigh: 0; overflow: hidden; padding-top: 50%;" class="relative-position">
        <div class="fit absolute-top-left">
          <q-carousel
            animated
            keep-alive
            height="100%"
            v-model="slide"
            :arrows="listing.listing_images.length > 1"
            :infinite="listing.listing_images.length > 1"
            :navigation="listing.listing_images.length > 1"
          >
            <q-carousel-slide
              class="q-pa-none cursor-pointer"
              v-for="(image, index) in  listing.listing_images"
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
    </template>
    <template v-slot:footer v-if="listingAlreadyInCart">
      <q-card-actions>
        <q-separator class="full-width q-mb-xs"></q-separator>
        <div class="row full-width">
          <q-btn @click="removeFromCart" color="negative" flat class="col-auto">
            Quitar
            <q-tooltip>
              Quitar articulo del carrito
            </q-tooltip>
          </q-btn>
          <q-space></q-space>
          <q-form @submit="updateInCart" @reset="amount = ''" class="row">
            <q-input class="col-auto q-mr-xs" type="number" required min="1" v-model="amount" :label="`Cantidad en carrito: ${amountInCart}`" dense square outlined></q-input>
            <q-btn class="col-auto" type="submit" color="primary">Guardar Cambios</q-btn>
          </q-form>
        </div>
      </q-card-actions>
      <q-card-section>
        <q-banner class="bg-positive" dense rounded inline-actions>
          Este articulo ya se encuentra en el carrito
          <template v-slot:action>
            <q-btn dense @click="$router.push('/cart')" flat label="Ir A Carrito"></q-btn>
          </template>
        </q-banner>
      </q-card-section>
    </template>
    <template v-slot:footer v-else>
      <q-card-actions>
        <q-separator class="full-width q-mb-xs"></q-separator>
        <div class="row full-width">
          <q-space></q-space>
          <q-form @submit="authProtected(addToCart)" @reset="amount = ''" class="row">
            <q-input class="col-auto q-mr-xs" type="number" min="1" required v-model="amount" label="Cantidad a Aggregar" dense square outlined></q-input>
            <q-btn class="col-auto" type="submit" color="primary">Aggregar a Carrito</q-btn>
          </q-form>
        </div>
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner></q-spinner>
      </q-inner-loading>
    </template>
  </listing-display>
</template>

<script>
import ListingDisplay from 'components/ListingDisplay'
import { mapActions } from 'vuex'

export default {
  name: 'AvailableListing',
  components: { ListingDisplay },
  props: {
    listing: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      slide: 0,
      loading: false,
      amount: '1'
    }
  },
  computed: {
    listingAlreadyInCart () {
      return this.$store.getters['cart/listingIsInCart'](this.listing.listing_id)
    },
    amountInCart () {
      if (!this.listingAlreadyInCart) {
        return null
      }

      return this.$store.getters['cart/listingInCart'](this.listing.listing_id).quantity
    }
  },
  methods: {
    ...mapActions(['authProtected']),
    async removeFromCart () {
      try {
        this.loading = true
        await this.$store.dispatch('cart/removeFromCart', {
          listingId: this.listing.listing_id
        })
        this.$q.notify({ color: 'positive', icon: 'mdi-check', message: 'Articulo quitado exitosamente' })
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    },
    async updateInCart () {
      try {
        this.loading = true
        await this.$store.dispatch('cart/addToCart', {
          quantity: Number(this.amount),
          listing_id: this.listing.listing_id
        })

        this.$q.notify({ color: 'positive', icon: 'mdi-check', message: 'Cantidad modificada exitosamente' })
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    },
    async addToCart () {
      try {
        this.loading = true
        await this.$store.dispatch('cart/addToCart', {
          quantity: Number(this.amount),
          listing_id: this.listing.listing_id
        })

        this.$q.notify({ color: 'positive', icon: 'mdi-check', message: 'Articulo aggregado exitosamente' })
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {

  }
}
</script>
