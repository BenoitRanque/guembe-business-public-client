<template>
  <section>
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
