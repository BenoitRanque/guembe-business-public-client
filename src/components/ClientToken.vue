<template>
  <q-card>
    <q-card-section class="text-h6 text-center">
      Token Cliente
    </q-card-section>
    <q-card-section class="text-center text-bold text-h5">
      {{`000000${token.code}`.slice(String(token.code).length)}}
    </q-card-section>
    <q-card-section class="text-center">
      <qr-code class="q-mx-lg q-mb-lg" v-if="token" :value="token.token_id" :size="150" level="H"></qr-code>
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
    async refreshToken (retrying = false) {
      const query = /* GraphQL */`mutation {
        insert: insert_store_client_token (objects: {}) {
          tokens: returning {
            token_id
            code
            expires
          }
        }
      }`

      try {
        this.loading = true

        const { insert: { tokens: [ token ] } } = await this.$gql(query)

        this.token = token
      } catch (error) {
        if (!retrying) {
          this.refreshToken(true)
        } else {
          this.$gql.handleError(error)
        }
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
