<template>
  <section :class="sectionClass">
    <template v-if="section.section_type_id === 'slide'">
      <div style="heigh: 0; overflow: hidden; padding-top: 50%;" class="relative-position q-mb-md">
        <div class="fit absolute-top-left">
          <!-- <pre>{{section}}</pre> -->
          <q-carousel
            keep-alive
            animated
            v-model="slide"
            height="100%"
            :autoplay="10000"
            :arrows="section.elements.length > 1"
            :infinite="section.elements.length > 1"
            :navigation="section.elements.length > 1"
          >
            <q-carousel-slide
              class="q-pa-none"
              v-for="(element, index) in section.elements"
              :class="{ 'cursor-pointer': !!element.target }"
              :key="`slide_${index}`"
              :name="index"
              @click="element.target ? $router.push(element.target) : null"
            >
              <q-img
                :src="element.image.src"
              >
                <template v-slot:loading></template>
              </q-img>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row wrap q-col-gutter-md">
        <dynamic-element v-for="(element, index) in section.elements" :key="index" :element="element">
          <template v-slot:editor>
            <dynamic-editor :element="element"></dynamic-editor>
          </template>
        </dynamic-element>
      </div>
    </template>
  </section>
</template>

<script>
import DynamicElement from 'components/DynamicElement'
import DynamicEditor from 'components/DynamicEditor'
export default {
  name: 'DynamicSection',
  components: { DynamicElement, DynamicEditor },
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      slide: 0
    }
  },
  computed: {
    sectionType () {
      return this.section.section_type_id
    },
    sectionClass () {
      if (this.sectionType === 'slide') {
        return {

        }
      }
      return {
        'page-section-wrapper': true,
        'q-pa-md': true
      }
    }
  }
}
</script>

<style lang="stylus">
  .page-section-wrapper
    margin 0 auto
    max-width 992px
</style>
