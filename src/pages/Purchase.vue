<template>
  <q-page padding>
    <template v-if="purchase">
      Razon Social: {{purchase.buyer_business_name}} <br />
      NIT: {{purchase.buyer_tax_identification_number}} <br />
      Estado de pago: {{purchase.payment.payment_status.description}}
      <template v-if="purchase.payment.status === 'PENDING'">
        <q-btn @click="verifyPaymentStatus(purchase.payment.payment_id)" flat label="Verificar Estado de pago"/>
        <br>
      </template>
      <div class="text-subtitle2">
        Facturas
      </div>
      <a v-for="({ izi_link }, index) in purchase.invoices" :key="`invoice_${index}`" download :href="izi_link">Factura {{index + 1}}</a>
      <listing-display class="q-my-md" v-for="({ listing }, index) in purchase.purchase_listings" :key="index" :listing="listing"></listing-display>
    </template>
    <pre>{{purchase}}</pre>
    <q-inner-loading :showing="loading">
      <q-spinner></q-spinner>
    </q-inner-loading>
  </q-page>
</template>

<script>
import ListingDisplay from 'components/ListingDisplay'
// individual purchase view
export default {
  name: 'Purchase',
  components: { ListingDisplay },
  props: {
    PurchaseId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      purchase: null
    }
  },
  methods: {
    async verifyPaymentStatus (payment_id) {
      try {
        this.loading = true

        await this.$api.post(`/store/verifypayment/${payment_id}`)
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
        this.loadPurchase()
      }
    },
    async loadPurchase () {
      const query = /* GraphQL */`
        query getPurchases ($purchase_id: uuid!) {
          purchase: store_purchase_by_pk (purchase_id: $purchase_id) {
            buyer_business_name
            buyer_tax_identification_number
            payment {
              payment_id
              status
              payment_status {
                description
              }
            }
            invoices {
              izi_link
              izi_timestamp
            }
            purchase_listings {
              quantity
              listing {
                listing_id
                public_name
                description
                listing_products {
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
                        description
                      }
                    }
                  }
                }
              }
            }
            purchased_products {
              product {
                public_name
                description
              }
              lifetime {
                description
              }
            }
          }
        }
      `
      const variables = {
        purchase_id: this.PurchaseId
      }

      try {
        this.loading = true

        const { purchase } = await this.$gql(query, variables)

        this.purchase = purchase
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.loadPurchase()
  }
}
</script>
