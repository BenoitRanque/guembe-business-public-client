<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-secondary">
      <q-toolbar>
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
        <q-separator dark vertical inset />
        <!-- <q-space></q-space> -->
        <q-toolbar-title>
          Biocentro Guembe
        </q-toolbar-title>

        <q-separator dark vertical inset />
        <q-btn
          stretch
          @click="$router.push('/cart')"
          flat
          icon="mdi-cart-outline"
          dense
          v-if="$store.state.cart.listings.length"
        >
          <q-badge floating color="red">
            {{$store.state.cart.listings.length}}
          </q-badge>
          <q-tooltip>
            {{$store.state.cart.listings.length}} articulos en carrito
          </q-tooltip>
        </q-btn>
        <q-btn-dropdown stretch flat label="Mi Cuenta">
          <q-list>
            <q-item>
              <q-item-section>
                hello
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-separator dark vertical inset />

        <social-login></social-login>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SocialLogin from 'components/SocialLogin'

export default {
  name: 'MyLayout',
  components: {
    SocialLogin
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
