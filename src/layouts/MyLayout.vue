<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="mdi-menu" />
        </q-btn>
        <q-btn
          flat
          dense
          round
          @click="$router.push('/')"
        >
          <q-icon name="mdi-home" />
        </q-btn>

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
        <social-login></social-login>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable to="/OAuthFailureCallback">
          <q-item-section>
            <q-item-label>OAuthFailureCallback</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/OAuthSuccessCallback">
          <q-item-section>
            <q-item-label>OAuthSuccessCallback</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/KhipuFailureCallback">
          <q-item-section>
            <q-item-label>KhipuFailureCallback</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/KhipuSuccessCallback">
          <q-item-section>
            <q-item-label>KhipuSuccessCallback</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator></q-separator>
        <q-item clickable to="/purchase">
          <q-item-section>
            <q-item-label>Purchase</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/listings">
          <q-item-section>
            <q-item-label>Listings</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

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
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
</style>
