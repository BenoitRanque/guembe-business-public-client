<template>
  <q-no-ssr class="my-custom-class">
    <q-banner rounded  class="bg-positive" inline-actions v-if="!cart.length">
      Carrito vacio. Puede aggregar articulos en la tienda
      <template v-slot:action>
        <q-btn @click="$router.push('/webstore/listings')" dense flat label="Ir a tienda"></q-btn>
      </template>
    </q-banner>
    <q-banner v-if="someItemsNoLongerAvailable" class="bg-warning q-mb-md" rounded inline-actions>
      Algunos articulos ya no se encuentran disponibles.
      Debe quitarlos antes de proceder con la compra.
      <template v-slot:action>
        <q-btn @click="removeUnavailableListings" flat label="quitar articulos"></q-btn>
      </template>
    </q-banner>
    <q-banner v-if="someItemsHaveInsufficientStock" class="bg-warning q-mb-md" rounded inline-actions>
      Algunos articulos no cuentan con stock sufficiente.
      Debe reducir la cantidad antes de proceder.
      <template v-slot:action>
        <q-btn @click="updateItemQuantities" flat label="Reducir cantidades"></q-btn>
      </template>
    </q-banner>
    <q-markup-table flat dense style="table-layout: fixed;">
      <thead>
        <tr>
          <th class="text-left">Paquete</th>
          <th class="text-right">Precio (unitario)</th>
          <th class="text-right">Cantidad</th>
          <th class="text-right">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <cart-listing class="q-mb-md" v-for="({ listing, quantity }, index) in cart" :key="index" :listing="listing" :quantity="quantity"></cart-listing>
        <!-- specify background color inline to override hover style -->
        <tr style="background: #fff">
          <td colspan="4" class="text-right text-subtitle2">
            Total: BS {{(!cart ? 0 : cart.reduce((acc, { quantity, listing: { total } }) => acc + (total * quantity), 0) / 100).toFixed(2)}}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-inner-loading :showing="loading">
      <q-spinner></q-spinner>
    </q-inner-loading>
  </q-no-ssr>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CartListing from 'components/CartListing'

export default {
  name: 'ShoppingCart',
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
    // ...mapState('oauth', {
    //   'clientName': state => state.credentials.account.name,
    //   'clientEmail': state => state.credentials.account.email
    // }),
    someItemsNoLongerAvailable () {
      if (!this.cart) return false

      return this.cart.some(({ listing }) => listing.inventory && !listing.inventory.available)
    },
    someItemsHaveInsufficientStock () {
      if (!this.cart) return false

      return this.cart.some(({ quantity, listing }) => listing.inventory && listing.inventory.remaining < quantity)
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
        mutation createPurchase ($objects: [webstore_purchase_insert_input!]!) {
          insert: insert_webstore_purchase (objects: $objects) {
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
      const { data: { khipu_payment_url } } = await this.$api.post(`/store/checkout/${purchase_id}`, {
        payment: {
          return_url: `${window.location.origin}/webstore/purchase/${purchase_id}`,
          cancel_url: `${window.location.origin}/webstore/cart`,
          payer_name: 'Benoit Ranque',
          payer_email: 'ranque.benoit@gmail.com'
        }
      })

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
          listings: delete_webstore_cart_listing (where: {
            listing: {
              _not: {
                inventory: {
                  available: {
                    _eq: true
                  }
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
          .filter(({ listing, quantity }) => listing.inventory && listing.inventory.remaining < quantity)
          .map(({ listing_id, listing: { inventory: { remaining: quantity } } }) => ({ quantity, listing_id }))
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
    this.updateCart()
  }
}
</script>

<style>
</style>
