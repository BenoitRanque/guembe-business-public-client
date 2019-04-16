<template>
  <q-page padding class="flex flex-center">
    <q-spinner size="8vh" :thickness="3" color="primary"></q-spinner>
    <!-- <pre>
    </pre> -->
  </q-page>
</template>

<script>
export default {
  name: 'OAuthCallback',
  data () {
    return {
    }
  },
  methods: {
    login () {
      const code = this.$route.query.code
      const state = JSON.parse(decodeURIComponent(this.$route.query.state))
      const { provider } = state
      console.log({
        provider,
        code,
        redirect_uri: `${window.location.origin}/callback`
      })
      this.$store.dispatch('auth/login', {
        provider,
        code,
        redirect_uri: `${window.location.origin}/callback`
      })
    },
    async handleCallback () {
      try {
        switch (this.$route.name) {
          case 'OAuthSuccessCallback':
            await this.handleOAuthSuccessCallback()
            break
          case 'OAuthFailureCallback':
            await this.handleOAuthFailureCallback()
            break
          case 'KhipuSuccessCallback':
            await this.handleKhipuSuccessCallback()
            break
          case 'KhipuFailureCallback':
            await this.handleKhipuFailureCallback()
            break
        }
      } catch (error) {
        const GraphQLError = this.$gql.GraphQLError
        if (error instanceof GraphQLError) {
          error.display()
        }
        throw error
      }
    },
    async handleOAuthSuccessCallback () {
      const code = this.$route.query.code
      const state = JSON.parse(decodeURIComponent(this.$route.query.state))
      const { provider, route } = state
      await this.$store.dispatch('auth/login', {
        provider,
        code,
        redirect_uri: `${window.location.origin}${this.$route.path}`
      })
      this.$router.push(route)
    },
    async handleOAuthFailureCallback () {

    },
    async handleKhipuSuccessCallback () {

    },
    async handleKhipuFailureCallback () {

    }
  },
  mounted () {
    this.$store.dispatch('handleCallback')
  }
}
</script>

<style>
</style>
