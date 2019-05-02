<template>
  <q-page padding>
    <div>
      <q-btn @click="getAvailableListings">getAvailableListings</q-btn>
    </div>
    <div v-for="(item, index) in items" :key="index">
      <q-expansion-item
        dense
      >
        <template slot="header">
          <q-item-section>
            <q-item-label header>
              hello
            </q-item-label>
            <q-item-label caption>
              hello
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-input outline></q-input>
          </q-item-section>
          <q-item-section side>
            <q-btn @click.stop.prevent="$q.notify('Hello')">trigger</q-btn>
          </q-item-section>
        </template>
        <q-card>
          <q-card-section>
            <pre>{{item}}</pre>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        dense
        label="Listing Details"
        caption=""
      >
        <q-card>
          <q-card-section>
            <pre>{{item}}</pre>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Purchase',
  data () {
    return {
      items: []
    }
  },
  methods: {
    async getAvailableListings () {
      const query = /* GraphQL */`
        query {
          store_available_listing {
            listing_id
            public_name
            description
            available_listing_products {
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

      const { store_available_listing } = await this.$gql(query)

      this.items = store_available_listing
    },
    createPurchase () {

    },
    addListing () {

    },
    updateListing () {

    },
    removeListing () {

    },
    checkOut () {

    }
  }
}
</script>

<style>
</style>
