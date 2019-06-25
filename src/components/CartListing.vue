<template>
  <tr @click="showDialog = true" class="cursor-pointer">
    <td>
      {{$i18n(listing, 'name')}}
    </td>
    <td class="text-right">
      BS {{(listing.total / 100).toFixed(2)}}
    </td>
    <td class="text-right">
      {{quantity}}
    </td>
    <td class="text-right">
      BS {{ ((listing.total * quantity) / 100).toFixed(2)}}
    </td>
    <q-dialog v-model="showDialog">
      <q-card>
        <q-bar>
          {{$i18n(listing, 'name')}}
          <q-space></q-space>
          <q-btn dense flat icon="mdi-close" v-close-popup></q-btn>
        </q-bar>
        <listing-display :listing="listing">
          <template v-slot:footer>
            <q-card-actions>
              <q-separator class="full-width q-mb-xs"></q-separator>
              <div class="row full-width">
                <q-btn @click="removeFromCart" color="negative" flat class="col-auto">
                  Quitar
                  <q-tooltip>
                    Quitar articulo del carrito
                  </q-tooltip>
                </q-btn>
                <q-space></q-space>
                <q-form @submit="updateInCart" @reset="amount = ''" class="row">
                  <q-input class="col-auto q-mr-xs" type="number" required min="1" v-model="amount" :label="`Cantidad en carrito: ${amountInCart}`" dense square outlined></q-input>
                  <q-btn class="col-auto" type="submit" color="primary">Guardar Cambios</q-btn>
                </q-form>
              </div>
            </q-card-actions>
          </template>
        </listing-display>
      </q-card>
    </q-dialog>
  </tr>
</template>

<script>
import ListingDisplay from 'components/ListingDisplay'

export default {
  name: 'CartListing',
  components: { ListingDisplay },
  props: {
    quantity: {
      type: Number,
      required: true
    },
    listing: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showDialog: false,
      loading: false,
      amount: ''
    }
  },
  computed: {
    amountInCart () {
      return this.$store.getters['cart/listingInCart'](this.listing.listing_id).quantity
    }
  },
  methods: {
    async removeFromCart () {
      try {
        this.loading = true
        await this.$store.dispatch('cart/removeFromCart', {
          listingId: this.listing.listing_id
        })
        this.$q.notify({ color: 'positive', icon: 'mdi-check', message: 'Articulo quitado exitosamente' })
        this.$emit('done')
        this.showDialog = false
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    },
    async updateInCart () {
      try {
        this.loading = true
        await this.$store.dispatch('cart/addToCart', {
          quantity: Number(this.amount),
          listing_id: this.listing.listing_id
        })
        this.$q.notify({ color: 'positive', icon: 'mdi-check', message: 'Cantidad modificada exitosamente' })
        this.$emit('done')
        this.showDialog = false
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
  }
}
</script>
