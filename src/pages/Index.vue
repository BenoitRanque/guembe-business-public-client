<template>
  <q-page class="flex flex-center column">
    <q-img contain style="max-height: 60vh; max-width: 60vw;" src="assets/isologo.svg" ></q-img>
    <q-btn flat @click="$router.push('/listings')" color="secondary" icon-right="mdi-forward">Ir A Tienda</q-btn>
    <q-btn @click="$refs.upload.upload()">upload</q-btn>
    <q-uploader
      ref="upload"
      url="http://localhost:3000/upload/listing/image/0ef0d374-8217-4598-ab30-2003bf90ffa9"
      accept=".jpg, .png, image/*"
      hide-upload-btn
      field-name="image"
      :multiple="false"
      :headers="[{
        name: 'Authorization',
        value: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LWhhc3VyYSI6eyJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW5pc3RyYXRvciJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiOGE1OTRiYWUtNTU4OC00MmRmLThmZDAtNzgxYTcwNzA5MWYzIiwieC1oYXN1cmEtdXNlcm5hbWUiOiJhZG1pbiJ9LCJpYXQiOjE1NTc4NDYzMTF9.0HRM7z1RSJv4K0K1HQLv2seJAoddWlXkAHUHMe9QuM8'
      }]"
    ></q-uploader>
    <q-btn color="primary">test</q-btn>
    <q-btn color="secondary">test</q-btn>
    <q-btn color="accent">test</q-btn>
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
