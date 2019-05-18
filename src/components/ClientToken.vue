<template>
  <q-card>
    <q-card-section>
      Codigo de cliente
      Muestre este codigo identificador al personal de la empresa para canjear su compra
    </q-card-section>
    <q-card-section class="text-center">
      <qr-code class="q-ma-lg" v-if="token" :value="token.token_id" :size="160" level="H"></qr-code>
    </q-card-section>
  </q-card>
</template>

<script>
import QrCode from 'qrcode.vue'
export default {
  name: 'ClientToken',
  components: { QrCode },
  data () {
    return {
      intervalId: null,
      token: null
    }
  },
  methods: {
    async refreshToken () {
      const query = /* GraphQL */`mutation {
        insert: insert_store_client_token (objects: {}) {
          tokens: returning {
            token_id
            expires
          }
        }
      }`

      try {
        this.loading = true

        const { insert: { tokens: [ token ] } } = await this.$gql(query)

        this.token = token
      } catch (error) {
        this.$gql.handleError(error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.refreshToken()
    this.intervalId = setInterval(this.refreshToken, 20 * 1000)
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  }
}
</script>
