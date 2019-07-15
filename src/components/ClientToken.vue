<template>
  <div class="q-pa-sm">
    <div class="q-mb-lg text-center text-bold text-h5">
      {{`000000${token.code}`.slice(String(token.code).length)}}
    </div>
    <div class="text-center">
      <qr-code class="q-mx-lg q-mb-lg" v-if="token" :value="token.token_id" :size="150" level="H"></qr-code>
    </div>
  </div>
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
        insert: insert_account_token (objects: {}) {
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
