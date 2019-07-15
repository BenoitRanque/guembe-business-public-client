<template>
  <section :class="section.fullwidth ? 'q-mb-md' : 'section-maxwidth q-mx-auto q-px-md q-my-md'">
    <slot name="editor" />
    <div class="row wrap q-col-gutter-md">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: 'DynamicSection',
  props: {
    section: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus">
  .section-maxwidth
    max-width 992px
</style>
