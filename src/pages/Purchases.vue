<template>
  <q-page padding>
    <q-btn @click="loadPurchases">UPDATE</q-btn>
    <template v-if="purchases">
      <div v-for="(purchase, index) in purchases" :key="index">
        <q-btn @click="verifyPaymentStatus(purchase.payment.payment_id)">Verify Payment Status</q-btn>
        <pre>{{purchase}}</pre>
      </div>
    </template>
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
      purchases: null,
      loading: false
    }
  },
  methods: {
    async verifyPaymentStatus (payment_id) {
      const query = /* GraphQL */`
        mutation ($payment_id: uuid!) {
          payment: verify_payment_status (payment_id: $payment_id) {
            name
            description
          }
        }
      `
      const variables = {
        payment_id
      }

      try {
        this.loading = true

        await this.$gql(query, variables)
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
        this.loadPurchases()
      }
    },
    async loadPurchases () {
      const query = /* GraphQL */`
        query getPurchases {
          purchases: store_purchase {
            buyer_business_name
            buyer_tax_identification_number
            payment {
              payment_id
              status
            }
            invoices {
              izi_link
              izi_timestamp
            }
            purchased_products {
              product {
                public_name
                description
              }
              lifetime {
                description
              }
            }
          }
        }
      `
      const variables = {
      }

      try {
        this.loading = true

        const { purchases } = await this.$gql(query, variables)

        this.purchases = purchases
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.loadPurchases()
  }
}
</script>

<style>
</style>
