<template>
  <q-page padding>
    <template v-if="!cart.length">
      <q-banner rounded  class="bg-positive" inline-actions>
        Carrito vacio. Puede aggregar articulos en la tienda
        <template v-slot:action>
          <q-btn @click="$router.push('/listings')" flat label="Ir a tienda"></q-btn>
        </template>
      </q-banner>
    </template>
    <template v-else>
      <q-banner v-if="someItemsNoLongerAvailable" class="bg-warning q-mb-md" rounded inline-actions>
        Algunos articulos ya no se encuentran disponibles.
        Debe quitarlos antes de proceder con la compra.
        <template v-slot:action>
          <q-btn @click="removeUnavailableListings" flat label="quitar todos"></q-btn>
        </template>
      </q-banner>
      <q-banner v-if="someItemsHaveInsufficientStock" class="bg-warning q-mb-md" rounded inline-actions>
        Algunos articulos no cuentan con stock sufficiente.
        Debe reducir la cantidad antes de proceder.
        <template v-slot:action>
          <q-btn @click="updateItemQuantities" flat label="Reducir cantidades"></q-btn>
        </template>
      </q-banner>
      <cart-listing class="q-mb-md" v-for="({ listing }, index) in cart" :key="index" :listing="listing"></cart-listing>
      <q-separator class="q-my-md"></q-separator>
      <div class="row q-gutter-x-sm">
        <div class="col">
          <q-input outlined dense v-model="nit" label="NIT"></q-input>
        </div>
        <div class="col">
          <q-input outlined dense v-model="razonSocial" label="RAZON SOCIAL"></q-input>
        </div>
      </div>
      <div class="text-right q-my-md">
        <q-btn color="primary" @click="checkout">Finalizar Compra</q-btn>
      </div>
    </template>
    <q-inner-loading :showing="loading">
      <q-spinner></q-spinner>
    </q-inner-loading>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CartListing from 'components/CartListing'

export default {
  name: 'Cart',
  components: { CartListing },
  data () {
    return {
      nit: 0,
      razonSocial: 'SIN NOMBRE',
      loading: false
    }
  },
  computed: {
    ...mapState('cart', { 'cart': 'listings' }),
    ...mapState('oauth', {
      'clientName': state => state.credentials.account.name,
      'clientEmail': state => state.credentials.account.email
    }),
    someItemsNoLongerAvailable () {
      if (!this.cart) return false

      return this.cart.some(({ listing }) => !listing.available_listing)
    },
    someItemsHaveInsufficientStock () {
      if (!this.cart) return false

      return this.cart.some(({ quantity, listing }) => listing.listing_stock && listing.listing_stock.remaining_stock < quantity)
    }
  },
  methods: {
    ...mapActions('cart', { loadCart: 'loadCart' }),
    async checkout () {
      try {
        this.loading = true
        const { purchase_id } = await this.createPurchase()

        const khipu_payment_url = await this.createPayment(purchase_id)

        window.location = khipu_payment_url
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    },
    async createPurchase () {
      const query = /* GraphQL */`
        mutation createPurchase ($objects: [store_purchase_insert_input!]!) {
          insert: insert_store_purchase (objects: $objects) {
            returning {
              purchase_id
            }
          }
          remove: delete_store_cart_listing (where: {}) {
            affected_rows
          }
        }
      `

      const variables = {
        objects: {
          buyer_business_name: this.razonSocial,
          buyer_tax_identification_number: String(this.nit),
          purchase_listings: {
            data: this.cart.map(({ listing_id, quantity }) => ({ listing_id, quantity }))
          }
        }
      }

      const { insert: { returning: [ purchase ] } } = await this.$gql(query, variables)

      return purchase
    },
    async createPayment (purchase_id) {
      const query = /* GraphQL */`
        mutation ($payment: StoreCheckoutPaymentInput! $purchase_id: uuid!) {
          store_checkout (purchase_id: $purchase_id, payment: $payment) {
            khipu_payment_url
          }
        }
      `

      const variables = {
        purchase_id,
        payment: {
          return_url: `${window.location.origin}/purchase/${purchase_id}`,
          cancel_url: `${window.location.origin}/cart`,
          payer_name: this.clientName,
          payer_email: this.clientEmail
        }
      }

      const { store_checkout: { khipu_payment_url } } = await this.$gql(query, variables)

      return khipu_payment_url
    },
    async updateCart () {
      try {
        this.loading = true

        await this.loadCart()
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    },
    async removeUnavailableListings () {
      const query = /* GraphQL */`
        mutation {
          listings: delete_store_cart_listing (where: {
            listing: {
              _not: {
                available_listing: {
                }
              }
            }
          }) {
            removed: affected_rows
          }
        }
      `

      try {
        this.loading = true

        const { listings: { removed } } = await this.$gql(query)

        this.$q.notify({ color: 'positive', icon: 'mdi-check', message: `Se removieron ${removed} items` })
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = true
      }

      this.updateCart()
    },
    async updateItemQuantities () {
      const query = /* GraphQL */`
        mutation updateListingQuantity ($objects: [store_cart_listing_insert_input!]!) {
          listings: insert_store_cart_listing (objects: $objects on_conflict: {
            constraint: cart_listing_pkey
            update_columns: [quantity]
          }) {
            updated: affected_rows
          }
        }
      `

      const variables = {
        objects: this.cart
          .filter(({ listing, quantity }) => listing.listing_stock && listing.listing_stock.remaining_stock < quantity)
          .map(({ listing_id, listing: { listing_stock: { remaining_stock: quantity } } }) => ({ quantity, listing_id }))
      }

      try {
        this.loading = true

        const { listings: { updated } } = await this.$gql(query, variables)

        this.$q.notify({ color: 'positive', icon: 'mdi-check', message: `Se actualizaron ${updated} items` })
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = true
      }

      this.updateCart()
    }
  },
  mounted () {
    // this.updateCart()
  }
}
</script>

<style>
</style>
