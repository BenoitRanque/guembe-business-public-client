<template>
  <q-page class="flex flex-center column">
    <q-img contain style="max-height: 60vh; max-width: 60vw;" src="assets/isologo.svg" ></q-img>
    <q-btn flat @click="$router.push('/listings')" color="secondary" icon-right="mdi-forward">Ir A Tienda</q-btn>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
    }
  }
}
</script>
