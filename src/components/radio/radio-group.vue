<template>
  <div class="z-check-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZRadioGroup',
  componentName: 'ZRadioGroup',
  props: {
    value: String,
    disabled: Boolean,
    size: String
  },
  computed: {
    radioGroupSize() {
      return this.size;
    }
  }
};
</script>

<style></style>
