<template>
  <q-card v-bind="$attrs">
    <slot name="header"/>
    <q-card-section class="text-subtitle2 row">
      {{listing.public_name}}
      <q-space></q-space>
      Bs {{listing.listing_products.reduce((subtotal, { price, quantity }) => subtotal + ((price / 100) * quantity), 0).toFixed(2)}}
    </q-card-section>
    <q-card-section class="text-caption">
      {{listing.description}}
    </q-card-section>
    <q-card-section class="q-px-none">
      <q-expansion-item dense label="Detalles" dense-toggle>
        <template v-slot:header>
          <q-item-section>
            <q-item-label caption>
              Mostrar Detalles
            </q-item-label>
          </q-item-section>
        </template>

        <q-markup-table
          separator="none"
          wrap-cells
          flat
          dense
        >
          <thead>
            <tr>
              <th class="text-left">Producto Incluido</th>
              <th class="text-right">Precio Unitario</th>
              <th class="text-right">Cantidad</th>
              <th class="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in listing.listing_products" :key="index">
              <td>
                <div class="text-body2">
                  {{product.product.public_name}}
                </div>
                <div class="text-caption">
                  {{product.product.description}}
                </div>
                <lifetime-display :lifetime="product.lifetime"></lifetime-display>
              </td>
              <td class="text-right">Bs {{(product.price / 100).toFixed(2)}}</td>
              <td class="text-right">{{product.quantity}}</td>
              <td class="text-right">Bs {{((product.price / 100) * product.quantity).toFixed(2)}}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-expansion-item>
    </q-card-section>
    <slot name="footer"/>
  </q-card>
</template>

<script>
import LifetimeDisplay from 'components/LifetimeDisplay'

export default {
  name: 'ListingDisplay',
  components: {
    LifetimeDisplay
  },
  props: {
    listing: {
      type: Object,
      required: true
    }
  }
}
</script>
