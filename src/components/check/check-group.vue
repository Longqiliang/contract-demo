<template>
  <div class="z-check-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZCheckGroup',
  componentName: 'ZCheckGroup',
  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String
  },
  computed: {
    checkGroupSize() {
      return this.size;
    }
  }
};
</script>

<style>
</style>
