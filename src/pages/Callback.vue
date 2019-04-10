<template>
  <div>
    <q-btn @click="login">login</q-btn>
  </div>
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
      this.$store.dispatch('auth/login', {
        provider,
        code,
        redirect_uri: `${window.location.origin}/callback`
      })
    }
  },
  mounted () {
  }
}
</script>

<style>
</style>
