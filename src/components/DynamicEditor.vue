<template>
  <div class="absolute-top-right q-ma-xs">
    <q-btn icon="mdi-pencil" color="white" text-color="black" size="sm" round @click="showDialog = true"/>
    <dialog-window v-model="showDialog">
      <q-form>
        <div class="q-gutter-md q-pa-md">
          <q-input v-model="element.caption"></q-input>
          <q-input v-model="element.title"></q-input>
          <q-input v-model="element.subtitle"></q-input>
          <q-editor v-model="element.body"></q-editor>
          <q-select v-model="element.size_id" :options="['xl', 'lg', 'md', 'sm', 'xs']"></q-select>
        </div>
      </q-form>
    </dialog-window>
  </div>
</template>

<script>
import DialogWindow from 'components/DialogWindow'
export default {
  name: 'DynamicEditor',
  components: { DialogWindow },
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showDialog: false
    }
  }
}
</script>
