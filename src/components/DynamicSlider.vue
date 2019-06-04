<template>
  <div style="heigh: 0; overflow: hidden; padding-top: 50%;" class="relative-position q-mb-md">
    <div class="fit absolute-top-left">
      <!-- <pre>{{section}}</pre> -->
      <q-carousel
        keep-alive
        animated
        v-model="slide"
        height="100%"
        :autoplay="10000"
        :arrows="slides.length > 1"
        :infinite="slides.length > 1"
        :navigation="slides.length > 1"
      >
        <q-carousel-slide
          class="q-pa-none"
          v-for="(slide, index) in slides"
          :class="{ 'cursor-pointer': !!slide.target }"
          :key="`slide_${index}`"
          :name="index"
          @click="slide.target ? $router.push(slide.target) : null"
        >
          <q-img
            :src="slide.i18n.image.src"
          >
            <template v-slot:loading></template>
          </q-img>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicSlider',
  props: {
    slides: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      slide: 0
    }
  }
}
</script>
