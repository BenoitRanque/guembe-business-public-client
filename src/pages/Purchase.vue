<template>
  <q-page padding>
    <q-input v-model="nit" label="NIT"></q-input>
    <q-input v-model="razonSocial" label="RAZON SOCIAL"></q-input>
    <q-btn @click="checkout">Finalizar Compra</q-btn>
    <pre>{{purchase}}</pre>
    <q-inner-loading :showing="loading">
      <q-spinner></q-spinner>
    </q-inner-loading>
  </q-page>
</template>

<script>
export default {
  name: 'Purchase',
  data () {
    return {
      nit: 0,
      razonSocial: 'SIN NOMBRE',
      purchase: null,
      loading: false
    }
  },
  methods: {
    async updatePurchase () {
      const query = /* GraphQL */`
        mutation ($nit: String! $razonSocial: String! $purchase_id: uuid!) {
          update_store_purchase (where: { purchase_id: { _eq: $purchase_id }}
          _set: {
            buyer_business_name: $razonSocial,
            buyer_tax_identification_number: $nit
          }) {
            affected_rows
          }
        }
      `

      const variables = {
        nit: this.nit,
        razonSocial: this.razonSocial,
        purchase_id: this.purchase.purchase_id
      }

      try {
        this.loading = true

        await this.$gql(query, variables)
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    },
    async checkout () {
      await this.updatePurchase()

      const query = /* GraphQL */`
        mutation ($payment: StoreCheckoutPaymentInput! $purchase_id: uuid!) {
          store_checkout (purchase_id: $purchase_id, payment: $payment) {
            khipu_payment_url
          }
        }
      `

      const variables = {
        purchase_id: this.purchase.purchase_id,
        payment: {
          return_url: 'http://localhost:8080',
          cancel_url: 'http://localhost:8080',
          payer_name: 'Benoit Ranque',
          payer_email: 'ranque.benoit@gmail.com'
        }
      }

      try {
        this.loading = true

        const { store_checkout: { khipu_payment_url } } = await this.$gql(query, variables)

        window.location = khipu_payment_url
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    },
    async getCurrentPurchase () {
      try {
        this.loading = true
        const purchase_id = await this.$store.dispatch('purchase/getCurrentPurchaseId')

        const query = /* GraphQL */`
          query getCurrentPurchase ($purchase_id: uuid!) {
            purchase: store_purchase_by_pk (purchase_id: $purchase_id) {
              purchase_id
              buyer_business_name
              buyer_tax_identification_number
              purchase_listings {
                quantity
                listing {
                  listing_id
                  public_name
                  description
                  listing_products {
                    price
                    quantity
                    product {
                      product_id
                      public_name
                      description
                    }
                    lifetime {
                      public_name
                      description
                      start
                      end
                      lifetime_weekdays {
                        weekday {
                          weekday_id
                          weekday_name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `

        const variables = {
          purchase_id
        }

        const { purchase } = await this.$gql(query, variables)

        this.purchase = purchase
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.getCurrentPurchase()
  }
}
</script>

<style>
</style>
