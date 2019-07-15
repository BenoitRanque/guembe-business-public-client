<template>
  <tr @click="dialog = true">
    <slot />
    <q-dialog v-model="dialog">
      <q-card>
        <q-bar>
          <slot name="dialog-title"></slot>
          <q-space></q-space>
          <q-btn dense icon="mdi-close" v-close-popup flat></q-btn>
        </q-bar>
        <slot name="dialog" />
      </q-card>
    </q-dialog>
  </tr>
</template>

<script>
export default {
  name: 'TableRowDialog',
  data () {
    return {
      dialog: false
    }
  }
}
</script>
