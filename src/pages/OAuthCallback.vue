<template>
  <q-page padding class="flex flex-center">
    <q-img contain style="max-height: 60vh; max-width: 60vw;" src="assets/isologo.svg" ></q-img>

    <q-inner-loading :showing="true">
      <q-spinner size="8vh" :thickness="3" color="primary"></q-spinner>
    </q-inner-loading>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'OAuthCallback',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('oauth', ['handleOAuthSuccessCallback', 'handleOAuthFailureCallback']),
    async handleCallback () {
      try {
        switch (this.$route.name) {
          case 'OAuthSuccessCallback':
            await this.handleOAuthSuccessCallback()
            break
          case 'OAuthFailureCallback':
            await this.handleOAuthFailureCallback()
            break
        }
      } catch (error) {
        this.$gql.handleError(error)
      }
    }
  },
  mounted () {
    this.handleCallback()
  }
}
</script>

<style>
</style>
