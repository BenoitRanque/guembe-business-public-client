<template>
  <q-img
    v-if="image"
    class="fixed-top-left fixed-bottom-right"
    :src="$img.src(image.image_id)"
    :srcset="$img.srcset(image)"
    :placeholder="image.placeholder"
  >
    <template v-slot:loading></template>
  </q-img>
</template>

<script>
export default {
  name: 'BackgroundImage',
  props: {
    path: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    image () {
      return this.$store.state.website.page ? this.$store.state.website.page.image : null
    }
  }
}
</script>
