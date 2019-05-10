<template>
  <listing-display :listing="listing" v-bind="$attrs">
    <template v-slot:footer>
      <q-separator></q-separator>
      <q-card-section class="row">
        <q-btn @click="removeFromCart" color="negative" class="col-auto">
          Quitar
        </q-btn>
        <q-space></q-space>
        <q-input type="number" v-model="amount" :label="`Cantidad en carrito: ${amountInCart}`" dense square outlined class="col-auto q-mx-xs"></q-input>
        <q-btn :disable="Number(amount) === Number(amountInCart) || Number(amount) < 1" @click="updateInCart" color="primary" class="col-auto">Guardar Cambios</q-btn>
      </q-card-section>
    </template>
  </listing-display>
</template>

<script>
import ListingDisplay from 'components/ListingDisplay'

export default {
  name: 'CartListing',
  components: { ListingDisplay },
  props: {
    listing: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      amount: 1
    }
  },
  computed: {
    amountInCart () {
      return this.$store.getters['cart/listingInCart'](this.listing.listing_id).quantity
    }
  },
  methods: {
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
    }
  },
  mounted () {
    this.amount = this.amountInCart
  }
}
</script>
