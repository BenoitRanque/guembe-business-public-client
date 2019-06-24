<template>
  <q-page padding>
    <q-btn @click="showClientCodeDialog = true" label="Ver Codigo Cliente"></q-btn>
    <q-dialog v-model="showClientCodeDialog">
      <client-token></client-token>
    </q-dialog>
    <template v-if="purchases && purchases.length">
      <q-list>
        <q-item :to="`/purchase/${purchase.purchase_id}`" v-for="(purchase, index) in purchases" :key="index">
          <q-item-section>
            <q-item-label :lines="1">
              {{purchase.buyer_business_name}} : {{purchase.buyer_tax_identification_number}}
            </q-item-label>
            <q-item-label caption :lines="1">
              {{formatDate(purchase.created_at, 'DD/MM/YYYY')}}
            </q-item-label>
          </q-item-section>
          <q-item-section side v-if="purchase.payment">
            BS {{Number(purchase.payment.amount / 100).toFixed(2)}}
          </q-item-section>
        </q-item>
      </q-list>
    </template>
    <template v-else>
      <q-banner rounded  class="bg-positive" inline-actions>
        Aun no tiene niguna compra realizada
        <template v-slot:action>
          <q-btn @click="$router.push('/webstore/listings')" flat label="Ir a tienda"></q-btn>
        </template>
      </q-banner>
    </template>
    <q-inner-loading :showing="loading">
      <q-spinner></q-spinner>
    </q-inner-loading>
  </q-page>
</template>

<script>
import ClientToken from 'components/ClientToken'
import { date } from 'quasar'
const { formatDate } = date

export default {
  name: 'Purchase',
  components: {
    ClientToken
  },
  data () {
    return {
      showClientCodeDialog: false,
      purchases: null,
      loading: false
    }
  },
  methods: {
    formatDate,
    async loadPurchases () {
      const query = /* GraphQL */`
        query getPurchases {
          purchases: store_purchase (order_by: { created_at: desc }) {
            purchase_id
            buyer_business_name
            buyer_tax_identification_number
            created_at
            payment {
              amount
              status
              payment_status {
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
