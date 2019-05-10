<template>
  <listing-display :listing="listing" v-bind="$attrs">
    <template v-slot:header v-if="listingAlreadyInCart">
      <q-card-section>
        <q-banner class="bg-positive" dense rounded>
          Este articulo ya se encuentra en el carrito
        </q-banner>
      </q-card-section>
    </template>
    <template v-slot:footer v-if="listingAlreadyInCart">
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
    <template v-slot:footer v-else>
      <q-separator></q-separator>
      <q-card-section class="row">
        <q-space></q-space>
        <q-input type="number" v-model="amount" label="Cantidad a Aggregar" dense square outlined class="col-auto q-mx-xs"></q-input>
        <q-btn @click="authProtected(addToCart)" color="primary" class="col-auto">Aggregar a Carrito</q-btn>
      </q-card-section>
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
      loading: false,
      amount: 1
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
    ...mapActions('oauth', ['authProtected']),
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
    if (this.listingAlreadyInCart) {
      this.amount = this.amountInCart
    }
  }
}
</script>
