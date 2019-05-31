<template>
  <q-btn v-if="isAuthenticated" flat label="Cerrar Session" @click="showSession = true">
    <q-dialog v-model="showSession">
      <q-card>
        <q-card-section>
          <q-btn @click="logout(), $router.push('/')">Logout</q-btn>
          <pre>
            {{$store.state}}
          </pre>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-btn>
  <q-btn v-else @click="showLogin = true" flat color="white" label="iniciar session">
    <q-dialog v-model="showLogin">
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
    </q-dialog>
  </q-btn>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'SocialLogin',
  data () {
    return {
      showLogin: false,
      showSession: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['authenticate', 'logout']),
    authenticationRequested () {
      this.showLogin = true
    }
  },
  created () {
    this.$root.$on('AUTHENTICATION_REQUIRED', this.authenticationRequested)
  },
  beforeDestroy () {
    this.$root.$off('AUTHENTICATION_REQUIRED', this.authenticationRequested)
  }
}
</script>

<style>
</style>
