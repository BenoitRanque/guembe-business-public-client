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
        type="a"
        :href="`${authUrl}/google`"
        color="red"
        icon="mdi-google"
      >Iniciar Session Con Google</q-btn>
    </q-card-section>
    <q-card-section>
      <q-btn
        class="full-width"
        type="a"
        :href="`${authUrl}/facebook`"
        color="blue"
        icon="mdi-facebook"
      >Iniciar Session Con Facebook</q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ClientAuthentication',
  computed: {
    authUrl () {
      return `${this.$api.defaults.baseURL}/auth/oauth`
    }
  }
}
</script>
