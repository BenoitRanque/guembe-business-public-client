<template>
  <div :class="elementClass">
    <q-card :class="{ 'cursor-pointer': !!element.target }" @click="element.target ? $router.push(element.target) : null">
      <q-img v-if="element.image" :src="element.image.src">
        <div class="absolute-bottom text-subtitle2 text-center" v-if="element.caption">
          {{element.caption}}
          <q-icon name="mdi-forward" v-if="element.target"></q-icon>
        </div>
      </q-img>
      <template v-if="element.title || element.subtitle || element.body">
        <q-card-section v-if="element.title || element.subtitle">
          <div v-if="element.title" class="text-h6 text-primary">{{element.title}}</div>
          <div v-if="element.subtitle" class="text-subtitle2 text-accent">{{element.subtitle}}</div>
        </q-card-section>

        <q-card-section v-if="element.body">
          <div v-html="element.body"></div>
        </q-card-section>
      </template>
      <slot name="editor"/>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'DynamicElement',
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  computed: {
    elementClass () {
      switch (this.element.size_id) {
        case 'xl': return 'col-12'
        case 'lg': return 'col-8'
        case 'md': return 'col-6'
        case 'sm': return 'col-4'
        case 'xs': return 'col-3'
        default: return ''
      }
    }
  }
}
</script>
