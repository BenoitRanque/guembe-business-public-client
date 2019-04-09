<template>
  <q-page class="flex flex-center">
    <auth0-login></auth0-login>
    <auth0-logout></auth0-logout>
    <q-btn @click="$store.state.auth.auth.login">login</q-btn>
  </q-page>
</template>

<style>
</style>

<script>
import Auth0Login from 'components/Auth0Login'
import Auth0Logout from 'components/Auth0Logout'
export default {
  name: 'PageIndex',
  components: {
    Auth0Login,
    Auth0Logout
  }
}
</script>
