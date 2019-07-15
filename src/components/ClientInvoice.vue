<template>
  <q-item clickable @click="dialog = true">
    <q-item-section side class="text-bold">
      <q-item-label>Nombre</q-item-label>
      <q-item-label>Nit</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{invoice.izi_razon_social}}</q-item-label>
      <q-item-label>{{invoice.izi_comprador}}</q-item-label>
    </q-item-section>
    <q-item-section side class="text-bold">
      <q-item-label>BS {{(invoice.total / 100).toFixed(2)}}</q-item-label>
    </q-item-section>
    <q-dialog v-model="dialog">
      <q-card>
        <q-bar>
          Factura
          <q-space />
          <q-btn flat dense icon="mdi-close" v-close-popup></q-btn>
        </q-bar>
        <div class="row no-wrap q-col-gutter-sm q-mx-sm items-center q-mt-sm">
          <div class="col-6 row">
            <div class="col-6 text-bold">Nº Autorizacion</div>
            <div class="col-6">{{invoice.izi_autorizacion}}</div>
            <div class="col-6 text-bold">Nº Factura</div>
            <div class="col-6">{{invoice.izi_numero}}</div>
            <div class="col-6 text-bold">Codigo de Control</div>
            <div class="col-6">{{invoice.izi_control}}</div>
          </div>
          <div class="col-6 row q-">
            <div class="col-4 text-bold">NIT</div>
            <div class="col-8">{{invoice.izi_comprador}}</div>
            <div class="col-4 text-bold">Nombre</div>
            <div class="col-8">{{invoice.izi_razon_social}}</div>
          </div>
        </div>
        <q-markup-table flat dense style="table-layout: fixed;">
          <thead>
            <tr>
              <th class="text-left">
                Descripcion
              </th>
              <th class="text-right">
                Cantidad
              </th>
              <th class="text-right">
                Precio Unitario
              </th>
              <th class="text-right">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in invoice.invoice_items" :key="index">
              <td>{{item.name}}</td>
              <td class="text-right">{{item.quantity}}</td>
              <td class="text-right">{{(item.price / 100).toFixed(2)}}</td>
              <td class="text-right">{{((item.price * item.quantity) / 100).toFixed(2)}}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-right text-bold">
                Total
              </td>
              <td class="text-right text-bold">
                BS {{(invoice.total / 100).toFixed(2)}}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <div class="text-center q-pa-md">
          <q-btn color="accent" type="a" :href="invoice.izi_link" download icon-right="mdi-download">Descargar</q-btn>
        </div>
      </q-card>
    </q-dialog>
  </q-item>
</template>

<script>
export default {
  name: 'ClientInvoice',
  props: {
    invoice: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>
