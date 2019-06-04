<template>
  <q-dialog :value="value" @input="update" :maximized="maximizedState" persistent>
    <q-layout container="" view="hHh lpr fff">
        <q-header>
          <q-bar>
            <slot name="title"></slot>
            <q-space />
            <q-btn flat dense icon="mdi-minus-box-outline" @click="maximizedState = false" :disable="!maximizedState"></q-btn>
            <q-btn flat dense icon="mdi-plus-box-outline" @click="maximizedState = true" :disable="maximizedState"></q-btn>
            <q-btn flat dense icon="mdi-close" v-close-popup></q-btn>
          </q-bar>
        </q-header>

        <q-page-container>
          <q-page class="bg-white">
            <slot name="default"></slot>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
</template>

<script>
export default {
  name: 'DialogWindow',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      maximizedState: false
    }
  },
  methods: {
    update (value) {
      this.$emit('input', value)
    }
  }
}
</script>
