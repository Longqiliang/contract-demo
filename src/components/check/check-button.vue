<template>
  <label
    class="z-check"
    :class="[
      size ? 'z-check--' + size : '',
      { 'is-disabled': isDisabled },
      { 'z-check--active': isChecked },
      { 'is-focus': focus }
    ]"
  >
    <input
      type="checkbox"
      class="z-check__input"
      :name="name"
      :disabled="isDisabled"
      :value="label"
      v-model="model"
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
  name: 'ZCheckButton',
  mixins: [Emitter],

  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },

  props: {
    value: {},
    label: {},
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number]
  },

  computed: {
    model: {
      get() {
        return this._checkGroup
          ? this.store
          : this.value !== undefined
          ? this.value
          : this.selfModel;
      },
      set(val) {
        if (this._checkGroup) {
          this.isLimitExceeded = false;
          this._checkGroup.min !== undefined &&
            val.length < this._checkGroup.min &&
            (this.isLimitExceeded = true);
          this._checkGroup.max !== undefined &&
            val.length > this._checkGroup.max &&
            (this.isLimitExceeded = true);
          this.isLimitExceeded === false &&
            this.dispatch('ZCheckGroup', 'input', [val]);
        } else if (this.value !== undefined) {
          this.$emit('input', val);
        } else {
          this.selfModel = val;
        }
      }
    },

    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      } else {
        return false;
      }
    },

    _checkGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'ZCheckGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    store() {
      return this._checkGroup ? this._checkGroup.value : this.value;
    },
    size() {
      return this._checkGroup.checkGroupSize || (this.$ELEMENT || {}).size;
    },
    isDisabled() {
      return this._checkGroup ? this._checkGroup.disabled : this.disabled;
    }
  },
  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(ev) {
      if (this.isLimitExceeded) return;
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
      this.$nextTick(() => {
        if (this._checkGroup) {
          this.dispatch('ZCheckGroup', 'change', [this._checkGroup.value]);
        }
      });
    }
  },
  created() {
    this.checked && this.addToStore();
  }
};
</script>

<style></style>
