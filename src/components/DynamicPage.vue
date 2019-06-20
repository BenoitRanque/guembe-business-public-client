<template>
  <div class="dynamic-page">
    <div class="q-gutter-md q-pa-md">
      <slot name="editor" />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicPage',
  props: {
    page: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus">
  .dynamic-page
    margin 0 auto
    max-width 992px
</style>
