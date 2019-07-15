<template>
  <q-card v-bind="$attrs" flat>
    <slot name="header"/>
    <q-card-section class="text-subtitle2 row">
      {{$i18n(listing, 'name')}}
      <q-space></q-space>
      Bs {{(listing.total / 100).toFixed(2)}}
    </q-card-section>
    <q-card-section class="text-caption">
      {{$i18n(listing, 'description')}}
    </q-card-section>
    <q-card-section class="q-px-none">
      <q-expansion-item dense label="Detalles" dense-toggle default-opened>
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
              <th class="text-left text-no-wrap">Producto Incluido</th>
              <th class="text-right text-no-wrap">Precio Unitario</th>
              <th class="text-right text-no-wrap">Cantidad</th>
              <th class="text-right text-no-wrap">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in listing.listing_products" :key="index">
              <td>
                <div class="text-body2">
                  {{$i18n(product.product, 'name')}}
                </div>
                <div class="text-caption">
                  {{$i18n(product.product, 'description')}}
                </div>
              </td>
              <td class="text-right text-no-wrap">Bs {{(product.price / 100).toFixed(2)}}</td>
              <td class="text-right text-no-wrap">{{product.quantity}}</td>
              <td class="text-right text-no-wrap">Bs {{((product.price / 100) * product.quantity).toFixed(2)}}</td>
            </tr>
          </tbody>
        </q-markup-table>
        <div class="q-px-md">
          <!-- <lifetime-display :lifetime="listing.lifetime"></lifetime-display> -->
        </div>
      </q-expansion-item>
      <q-expansion-item label="Vigencia">
        <div class="q-px-md">
          <lifetime :lifetime="listing.lifetime"></lifetime>
        </div>
      </q-expansion-item>
    </q-card-section>
    <slot name="footer"/>
  </q-card>
</template>

<script>
// import LifetimeDisplay from 'components/LifetimeDisplay'
import Lifetime from 'components/Lifetime'

export default {
  name: 'ListingDisplay',
  components: {
    // LifetimeDisplay
    Lifetime
  },
  props: {
    listing: {
      type: Object,
      required: true
    }
  }
}
</script>
