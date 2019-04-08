<template>
  <q-page class="flex flex-center">
    <facebook-login></facebook-login>
  </q-page>
</template>

<style>
</style>

<script>
import FacebookLogin from 'components/FacebookLogin'
export default {
  name: 'PageIndex',
  components: {
    FacebookLogin
  }
}
</script>
