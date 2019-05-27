<template>
  <q-page class="flex flex-center column">
    <q-img contain style="max-height: 60vh; max-width: 60vw;" src="assets/isologo.svg" ></q-img>
    <q-btn flat @click="$router.push('/listings')" color="secondary" icon-right="mdi-forward">Ir A Tienda</q-btn>
    <q-btn flat @click="test" color="secondary" icon-right="mdi-forward">Test</q-btn>
    <pre>{{result}}</pre>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      result: null
    }
  },
  methods: {
    async test () {
      try {
        const response = await this.$api.post('/auth/authenticate', { username: 'admin', password: 'admin' })

        this.result = response
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
