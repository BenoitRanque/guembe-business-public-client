<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-primary">
        <q-btn
          stretch
          flat
          dense
          @click="$router.push('/')"
        >
          <q-avatar rounded>
            <img src="statics/icons/icon-256x256.png">
          </q-avatar>
        </q-btn>
        <q-separator vertical inset />
        <!-- <q-space></q-space> -->
        <q-toolbar-title>
          Biocentro Guembe
        </q-toolbar-title>

        <q-separator vertical inset />
        <template v-if="isAuthenticated">
          <q-btn-dropdown
            flat stretch
            auto-close
            label="Mi Cuenta"
          >
            <q-list>
              <q-item to="/cart">
                <q-item-section side>
                  <q-icon name="mdi-cart-outline">
                    <q-badge floating color="primary" v-if="$store.state.cart.listings.length">
                      {{$store.state.cart.listings.length}}
                    </q-badge>
                    <q-tooltip>
                      {{$store.state.cart.listings.length}} articulos en carrito
                    </q-tooltip>
                  </q-icon>
                </q-item-section>
                <q-item-section>
                  Carrito
                </q-item-section>
              </q-item>
              <q-item to="/purchases">
                <q-item-section side>
                  <q-icon name="mdi-receipt">
                  </q-icon>
                </q-item-section>
                <q-item-section>
                  Compras
                </q-item-section>
              </q-item>
              <q-separator></q-separator>
              <q-item clickable @click="logout">
                <q-item-section side>
                  <q-icon name="mdi-logout"></q-icon>
                </q-item-section>
                <q-item-section>
                  Cerrar Session
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
        <template v-else>
          <q-btn-dropdown flat stretch label="Iniciar Session" auto-close>
            <client-authentication></client-authentication>
            <!-- <q-list>
              <q-item-label header>
                Opciones de inicio de session
              </q-item-label>
              <q-item>
                <q-item-section>
                  <q-btn
                    class="full-width"
                    @click="authenticate({ provider: 'google' })"
                    color="red"
                    no-wrap
                    no-caps
                  >
                    <q-icon name="mdi-google" size="1.2em" left></q-icon>
                    Iniciar Session Con Google
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-separator></q-separator>
              <q-item>
                <q-item-section>
                  <q-btn
                    class="full-width"
                    @click="authenticate({ provider: 'facebook' })"
                    color="blue"
                    no-wrap
                    no-caps
                  >
                    <q-icon name="mdi-facebook" size="1.2em" left></q-icon>
                    Iniciar Session Con Facebook
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list> -->
          </q-btn-dropdown>
        </template>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showLoginDialog">
      <client-authentication></client-authentication>
      <!-- <q-card>
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
      </q-card> -->
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ClientAuthentication from 'components/ClientAuthentication'
export default {
  name: 'ClientLayout',
  components: {
    ClientAuthentication
  },
  data () {
    return {
      showLoginDialog: false
    }
  },
  computed: {
    ...mapGetters('oauth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('oauth', ['authenticate', 'logout']),
    authenticationRequested () {
      this.showLoginDialog = true
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
