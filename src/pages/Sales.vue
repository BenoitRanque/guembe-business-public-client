<template>
  <q-page padding>
    <template v-if="sales.length">
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-left">Fecha</th>
            <th class="text-center">Hora</th>
            <th class="text-center">Total</th>
            <th class="text-center">Pago</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sale, index) in sales" :key="index" @click="$router.push(`/webstore/sale/${sale.sale_id}`)">
            <td class="text-left">{{formatDate(sale.created_at, 'DD/MM/YYYY')}}</td>
            <td class="text-center">{{formatDate(sale.created_at, 'HH:mm')}}</td>
            <td class="text-center">BS {{(sale.total / 100).toFixed(2)}}</td>
            <td class="text-center">{{paymentStatus(sale.sale_payment.payment.status)}}</td>
          </tr>
        </tbody>
      </q-markup-table>
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
import { date } from 'quasar'
const { formatDate } = date

export default {
  name: 'Purchase',
  data () {
    return {
      sales: [],
      loading: false
    }
  },
  methods: {
    formatDate,
    paymentStatus (status) {
      switch (status) {
        case 'PENDING': return 'Pendiente'
        case 'COMPLETED': return 'Completado'
        default: return 'Unknown payment status'
      }
    },
    async loadSales () {
      const query = /* GraphQL */`query getSales {
        sales: webstore_sale (order_by: { created_at: desc }) {
          sale_id
          created_at
          total
          sale_payment {
            payment {
              status
            }
          }
        }
      }`

      const variables = {}

      try {
        this.loading = true

        const { sales } = await this.$gql(query, variables)

        this.sales = sales
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.loadSales()
  }
}
</script>

<style>
</style>
