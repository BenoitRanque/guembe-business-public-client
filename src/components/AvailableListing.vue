<template>
  <listing-display :listing="listing" v-bind="$attrs">
    <template v-slot:header v-if="listingAlreadyInCurrentPurchase">
      <q-card-section>
        <q-banner class="bg-positive" dense rounded>
          Este articulo ya se encuentra en la compra actual
        </q-banner>
      </q-card-section>
    </template>
    <template v-slot:footer v-if="listingAlreadyInCurrentPurchase">
      <q-separator></q-separator>
      <q-card-section class="row">
        <q-btn @click="removeFromCurrentPurchase" color="negative" class="col-auto">
          Quitar
        </q-btn>
        <q-space></q-space>
        <q-input type="number" v-model="amount" :label="`Cantidad en carrito: ${amountInCurrentPurchase}`" dense square outlined class="col-auto q-mx-xs"></q-input>
        <q-btn :disable="Number(amount) === Number(amountInCurrentPurchase) || Number(amount) < 1" @click="updateInCurrentPurchase" color="primary" class="col-auto">Guardar Cambios</q-btn>
      </q-card-section>
    </template>
    <template v-slot:footer v-else>
      <q-separator></q-separator>
      <q-card-section class="row">
        <q-space></q-space>
        <q-input type="number" v-model="amount" label="Cantidad a Aggregar" dense square outlined class="col-auto q-mx-xs"></q-input>
        <q-btn @click="addToCurrentPurchase" color="primary" class="col-auto">Aggregar a Carrito</q-btn>
      </q-card-section>
      <q-inner-loading :showing="loading">
        <q-spinner></q-spinner>
      </q-inner-loading>
    </template>
  </listing-display>
</template>

<script>
import ListingDisplay from 'components/ListingDisplay'

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
      loading: false,
      amount: 1
    }
  },
  computed: {
    listingAlreadyInCurrentPurchase () {
      return this.$store.getters['cart/listingIsInCart'](this.listing.listing_id)
    },
    amountInCurrentPurchase () {
      if (!this.listingAlreadyInCurrentPurchase) {
        return null
      }

      return this.$store.getters['cart/listingInCart'](this.listing.listing_id).quantity
    }
  },
  methods: {
    async removeFromCurrentPurchase () {
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
    async updateInCurrentPurchase () {
      try {
        this.loading = true
        await this.$store.dispatch('cart/addToCart', {
          amount: Number(this.amount),
          listingId: this.listing.listing_id
        })
        this.$q.notify({ color: 'positive', icon: 'mdi-check', message: 'Cantidad modificada exitosamente' })
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    },
    async addToCurrentPurchase () {
      try {
        this.loading = true
        await this.$store.dispatch('cart/addToCart', {
          amount: Number(this.amount),
          listingId: this.listing.listing_id
        })
        this.$q.notify({ color: 'positive', icon: 'mdi-check', message: 'Articulo aggregado exitosamente' })
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
