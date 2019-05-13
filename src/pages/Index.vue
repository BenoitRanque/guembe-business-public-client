<template>
  <q-page class="flex flex-center column">
    <q-img contain style="max-height: 60vh; max-width: 60vw;" src="assets/isologo.svg" ></q-img>
    <q-btn flat @click="$router.push('/listings')" color="secondary" icon-right="mdi-forward">Ir A Tienda</q-btn>
    <q-btn @click="$refs.upload.upload()">upload</q-btn>
    <q-uploader ref="upload"  url="http://localhost:3000/upload" accept=".jpg, .png, image/*" hide-upload-btn field-name="image" :multiple="false"></q-uploader>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      dialog: false
    }
  }
}
</script>
