<template>
  <label
    class="z-check"
    :class="[
      size ? 'z-check--' + size : '',
      { 'is-disabled': isDisabled },
      { 'z-check--active': value === label },
      { 'is-focus': focus }
    ]"
    :tabindex="tabIndex"
  >
    <input
      type="radio"
      class="z-check__input"
      :name="name"
      :disabled="isDisabled"
      :value="label"
      v-model="value"
      tabindex="-1"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false"
    />
    <span>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script>
import Emitter from '@/mixins/emitter';

export default {
  name: 'ZRadioButton',
  mixins: [Emitter],

  data() {
    return {
      focus: false
    };
  },

  props: {
    label: {},
    disabled: Boolean,
    name: String
  },

  computed: {
    value: {
      get() {
        return this._radioGroup.value;
      },
      set(value) {
        this._radioGroup.$emit('input', value);
      }
    },

    _radioGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'ZRadioGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },

    tabIndex() {
      return this.isDisabled || (this._radioGroup && this.value !== this.label)
        ? -1
        : 0;
    },

    size() {
      return this._radioGroup.radioGroupSize || (this.$ELEMENT || {}).size;
    },

    isDisabled() {
      return this.disabled || this._radioGroup.disabled;
    }
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.dispatch('ZradioGroup', 'handleChange', this.value);
      });
    }
  }
};
</script>

<style></style>
