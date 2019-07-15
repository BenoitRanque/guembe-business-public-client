<template>
  <q-page padding>
    <div class="row">
      <div class="col text-h4">
        Vouchers
      </div>
      <div class="col-auto">
        <q-checkbox v-model="viewOnlyAvailable" left-label label="Ver solo vouchers disponibles"></q-checkbox>
      </div>
    </div>
    <q-markup-table dense class="q-ma-sm">
      <thead>
        <tr>
          <th class="text-left">Descripcion</th>
          <th class="text-center">Fecha</th>
          <th class="text-center">Cantidad Adquirida</th>
          <th class="text-center">Cantidad Utilizada</th>
          <th class="text-center">Cantidad Disponible</th>
          <th class="text-right">Compra</th>
        </tr>
      </thead>
      <tbody>
        <table-row-dialog v-for="(voucher, index) in vouchers" :key="`voucher_${index}`">
          <td class="text-left">
            {{voucher.listing.emit_multiple_vouchers ? $i18n(voucher.voucher_products[0].product, 'name') : $i18n(voucher.listing, 'name')}}
            <q-tooltip>
              {{voucher.listing.emit_multiple_vouchers ? $i18n(voucher.voucher_products[0].product, 'description') : $i18n(voucher.listing, 'description')}}
            </q-tooltip>
          </td>
          <td class="text-center">{{formatDate(voucher.created_at, 'DD/MM/YYYY')}}</td>
          <td class="text-center">{{voucher.voucher_status.aquired}}</td>
          <td class="text-center">{{voucher.voucher_status.used}}</td>
          <td class="text-center">{{voucher.voucher_status.remaining}}</td>
          <td class="text-right">
            <q-btn flat size="sm" dense icon-right="mdi-forward" label="Ir" @click="$router.push(`/webstore/sale/${voucher.sale_id}`)">
              <q-tooltip>
                Ir a Compra
              </q-tooltip>
            </q-btn>
          </td>
          <template v-slot:dialog-title>
            Voucher
          </template>
          <template v-slot:dialog>
            <client-voucher :voucher="voucher"></client-voucher>
          </template>
        </table-row-dialog>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
import TableRowDialog from 'components/TableRowDialog'
import ClientVoucher from 'components/ClientVoucher'

import { date } from 'quasar'
const { formatDate } = date

export default {
  name: 'Vouchers',
  components: { TableRowDialog, ClientVoucher },
  data () {
    return {
      viewOnlyAvailable: true,
      vouchers: []
    }
  },
  methods: {
    formatDate,
    async loadVouchers () {
      const query = /* GraphQL */`query getVouchers ($where: webstore_voucher_bool_exp!) {
        vouchers: webstore_voucher (where: $where order_by: { created_at: desc }) {
          created_at
          sale_id
          listing {
            emit_multiple_vouchers
            listing_id
            total
            i18n (where: { locale_id: { _eq: "es"} }) {
              name
              description
            }
          }
          aquired
          voucher_status {
            aquired
            used
            remaining
            available
            usable
          }
          voucher_products {
            product {
              product_id
              i18n (where: { locale_id: { _eq: "es"} }) {
                name
                description
              }
            }
            quantity
          }
          voucher_claims (where: { cancelled: { _eq: false } } order_by: { created_at: desc }) {
            claimed
            created_at
          }
        }
      }`

      const variables = {
        where: this.viewOnlyAvailable ? {
          voucher_status: {
            available: {
              _eq: this.viewOnlyAvailable
            }
          }
        } : {}
      }

      try {
        this.loading = true

        const { vouchers } = await this.$gql(query, variables)

        this.vouchers = vouchers
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.loadVouchers()
  }
}
</script>
