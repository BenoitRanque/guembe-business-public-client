<template>
  <q-page padding>
    <div v-if="listing">
      <div class="row">
        <div class="col text-h5">
          Paquete
        </div>
        <div class="col-auto text-h5">
          Precio
        </div>
      </div>
      <div class="row">
        <div class="col text-h6">
          {{listing.public_name}}
        </div>
        <div class="col-auto text-h6">
          {{listing.products.reduce((subtotal, { price, quantity }) => subtotal + ((price / 100) * quantity), 0).toFixed(2)}}
        </div>
      </div>
      <div class="text-subtitle1">{{listing.description}}</div>
      <div class="text-subtitle2">Productos incluidos:</div>
      <q-markup-table
        separator="none"
        wrap-cells
        flat
        dense
      >
        <thead>
          <tr>
            <th class="text-left">Producto</th>
            <th class="text-right">Precio</th>
            <th class="text-right">Cantidad</th>
            <th class="text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in listing.products" :key="index">
            <td>
              <div class="text-body2">
                {{product.product.public_name}}
              </div>
              <div class="text-caption">
                {{product.product.description}}
              </div>
              <lifetime-display :lifetime="product.lifetime"></lifetime-display>
            </td>
            <td class="text-right">{{(product.price / 100).toFixed(2)}}</td>
            <td class="text-right">{{product.quantity}}</td>
            <td class="text-right">{{((product.price / 100) * product.quantity).toFixed(2)}}</td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-separator></q-separator>
      <div class="row q-mt-md">
        <q-space></q-space>
        <q-input label="Cantidad a Aggregar" dense square outlined class="col-auto q-mx-xs"></q-input>
        <q-btn color="primary" class="col-auto">Aggregar a Carrito</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import LifetimeDisplay from 'components/LifetimeDisplay'

export default {
  name: 'Listing',
  components: {
    LifetimeDisplay
  },
  props: {
    ListingId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      listing: null
    }
  },
  methods: {
    async loadListing (ListingId) {
      const query = /* GraphQL */`
        query ($where: store_available_listing_bool_exp!) {
          listings: store_available_listing (where: $where) {
            listing_id
            public_name
            description
            products: available_listing_products {
              product {
                public_name
                description
              }
              quantity
              price
              lifetime {
                public_name
                description
                start
                end
                lifetime_weekdays (order_by: [{weekday: { weekday_id: asc } }]) {
                  weekday {
                    weekday_id
                    weekday_name
                  }
                }
              }
            }
          }
        }
      `

      const variables = {
        where: {
          listing_id: {
            _eq: ListingId
          }
        }
      }

      try {
        this.loading = true

        const { listings: [ listing ] } = await this.$gql(query, variables)

        this.listing = listing
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.loadListing(this.ListingId)
  }
}
</script>

<style>
</style>
