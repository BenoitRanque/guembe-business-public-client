<template>
  <div>
    <slot name="editor"/>
    <slot />
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
