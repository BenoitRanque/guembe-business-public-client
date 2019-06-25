<template>
  <q-page padding>
    <shopping-cart />
    <div class="text-right q-my-md">
      <q-btn color="primary" @click="$router.push('/webstore/checkout')">Ir a checkout</q-btn>
    </div>
  </q-page>
</template>

<script>
import ShoppingCart from 'components/ShoppingCart'

export default {
  name: 'Cart',
  components: { ShoppingCart }
}
</script>

<style>
</style>
