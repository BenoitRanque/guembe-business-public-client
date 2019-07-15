<template>
  <div>

    <div class="q-mx-md q-mt-sm">
      Cada voucher puede utilizarse independientemente
    </div>
    <q-expansion-item label="Productos incluidos" default-opened>
      <q-markup-table dense class="q-ma-sm">
        <thead>
          <tr>
            <th class="text-left">Descripcion</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in voucher.voucher_products" :key="`product_${index}`">
            <td>
              {{$i18n(product.product, 'name')}}
              <q-tooltip>
                {{$i18n(product.product, 'description')}}
              </q-tooltip>
            </td>
            <td class="text-center">{{product.quantity}}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-expansion-item>
    <q-expansion-item label="Uso">
      <q-markup-table dense class="q-ma-sm">
        <thead>
          <tr>
            <th class="text-left">Fecha</th>
            <th>Hora</th>
            <th>Cantidad utilizada</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(claim, index) in voucher.voucher_claims" :key="`claim_${index}`">
            <td>{{formatDate(claim.created_at, 'DD/MM/YYYY')}}</td>
            <td class="text-center">{{formatDate(claim.created_at, 'HH:mm')}}</td>
            <td class="text-center">{{claime.claimed}}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-expansion-item>
  </div>
</template>

<script>
import { date } from 'quasar'
const { formatDate } = date
export default {
  name: 'ClientVoucher',
  props: {
    voucher: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    formatDate
  }
}
</script>
