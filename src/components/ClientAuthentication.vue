<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-center">
        Bienvenido
      </div>
      <div class="text-subtitle2 text-center">
        Por favor inicia session
      </div>
    </q-card-section>
    <q-card-section>
      <q-btn
        class="full-width"
        @click="authenticate({ provider: 'google' })"
        color="red"
        icon="mdi-google"
      >Iniciar Session Con Google</q-btn>
    </q-card-section>
    <q-card-section>
      <q-btn
        class="full-width"
        @click="authenticate({ provider: 'facebook' })"
        color="blue"
        icon="mdi-facebook"
      >Iniciar Session Con Facebook</q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ClientAuthentication',
  methods: {
    ...mapActions('oauth', ['authenticate'])
  }
}
</script>
