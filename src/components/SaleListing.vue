<template>
  <tr @click="dialog = true">
    <td class="text-left">
      {{$i18n(listing.listing, 'name')}}
      <q-tooltip>
        {{$i18n(listing.listing, 'description')}}
      </q-tooltip>
    </td>
    <td class="text-right">{{listing.quantity}}</td>
    <td class="text-right">{{(listing.listing.total / 100).toFixed(2)}}</td>
    <td class="text-right">{{((listing.listing.total * listing.quantity) / 100).toFixed(2)}}</td>
    <q-dialog v-model="dialog">
      <q-card>
        <q-bar>
          Paquete
          <q-space />
          <q-btn flat dense icon="mdi-close" v-close-popup></q-btn>
        </q-bar>
        <listing-display :listing="listing.listing"></listing-display>
      </q-card>
    </q-dialog>
  </tr>
</template>

<script>
import ListingDisplay from 'components/ListingDisplay'

export default {
  name: 'SaleListing',
  components: { ListingDisplay },
  props: {
    listing: {
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
