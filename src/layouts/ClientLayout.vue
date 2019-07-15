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

        <!-- remove for testing -->
        <q-separator vertical inset />
        <template v-if="isAuthenticated">
          <q-btn-dropdown
            flat stretch
            auto-close
            label="Mi Cuenta"
          >
            <q-list>
              <q-item to="/webstore/cart">
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
              <q-item to="/webstore/sales">
                <q-item-section side>
                  <q-icon name="mdi-shopping">
                  </q-icon>
                </q-item-section>
                <q-item-section>
                  Compras
                </q-item-section>
              </q-item>
              <q-item to="/webstore/vouchers">
                <q-item-section side>
                  <q-icon name="mdi-receipt">
                  </q-icon>
                </q-item-section>
                <q-item-section>
                  Vouchers
                </q-item-section>
              </q-item>
              <q-item clickable @click="showClientTokenDialog = true">
                <q-item-section side>
                  <q-icon name="mdi-qrcode">
                  </q-icon>
                </q-item-section>
                <q-item-section>
                  Token Cliente
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
          </q-btn-dropdown>
        </template>
      </q-toolbar>
    </q-header>

    <router-view name="background"></router-view>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showLoginDialog">
      <client-authentication></client-authentication>
    </q-dialog>

    <q-dialog v-model="showClientTokenDialog">
      <q-card>
        <q-bar>
          Token Cliente
          <q-space></q-space>
          <q-btn dense icon="mdi-close" v-close-popup flat></q-btn>
        </q-bar>
        <q-card-section>
          <client-token></client-token>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ClientAuthentication from 'components/ClientAuthentication'
import ClientToken from 'components/ClientToken'
export default {
  name: 'ClientLayout',
  components: {
    ClientAuthentication,
    ClientToken
  },
  data () {
    return {
      showLoginDialog: false,
      showClientTokenDialog: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions({ storeLogout: 'LOGOUT' }),
    async logout () {
      try {
        await this.storeLogout()
        this.$router.push('/')
      } catch (error) {
        this.$api.handleError(error)
      }
    },
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
