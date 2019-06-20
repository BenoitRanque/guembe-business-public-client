<template>
  <div :class="elementClass">
    <q-card class="overflow-hidden rounded-borders">
      <slot name="editor"></slot>
      <div :class="{ 'cursor-pointer': hasLink }" @click="handleClick">
        <q-img
          v-if="$i18n(element, 'image')"
          :src="$img.src($i18n(element, 'image').image_id)"
          :srcset="$img.srcset($i18n(element, 'image'))"
          :sizes="imageSizes"
          :placeholder="$i18n(element, 'image').placeholder"
        >
          <div class="absolute-bottom text-subtitle2 text-center" v-if="$i18n(element, 'caption')">
            {{$i18n(element, 'caption')}}
            <q-icon name="mdi-forward" v-if="hasLink"></q-icon>
          </div>
        </q-img>
        <q-card-section v-if="$i18n(element, 'title') || $i18n(element, 'subtitle')">
          <div v-if="$i18n(element, 'title') " class="text-h6 text-primary">{{$i18n(element, 'title') }}</div>
          <div v-if="$i18n(element, 'subtitle')" class="text-subtitle2 text-accent">{{$i18n(element, 'subtitle')}}</div>
        </q-card-section>
        <q-card-section v-if="$i18n(element, 'body')">
          <div v-html="$i18n(element, 'body')"></div>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'DynamicElement',
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasLink () {
      if (this.element.internal_link !== null) return true
      if (this.element.external_link !== null) return true
      if (this.element.listing_link !== null) return true
      return false
    },
    imageSizes () {
      switch (this.element.size_id) {
        case 'xl': return '100vw'
        case 'lg': return '80vw'
        case 'md': return '50vw'
        case 'sm': return '33vw'
        case 'xs': return '25vw'
        default: return ''
      }
    },
    elementClass () {
      switch (this.element.size_id) {
        case 'xl': return 'col-12'
        case 'lg': return 'col-12 col-md-8'
        case 'md': return 'col-12 col-sm-6'
        case 'sm': return 'col-12 col-sm-6 col-md-4'
        case 'xs': return 'col-6 col-sm-3'
        default: return ''
      }
    }
  },
  methods: {
    handleClick () {
      if (this.element.internal_link !== null) {
        this.$router.push(`/${this.element.internal_link}`)
      } else if (this.element.external_link !== null) {
        openURL(this.element.external_link)
      } else if (this.element.listing_link !== null) {
        this.$router.push(`/listing/${this.element.listing_link}`)
      }
    }
  }
}
</script>
