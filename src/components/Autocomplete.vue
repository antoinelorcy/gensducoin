<script>
import { uid } from "~/utils";
import { createPopper } from "@popperjs/core";

export default {
  inheritAttrs: false,

  props: {
    id: {
      type: String,
      required: false,
      default() {
        return uid();
      }
    },
    value: {
      type: Object,
      required: true
    },
    maxLength: Number,
    icon: String,
    prefix: String,
    hasError: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    suggestionFromLength: {
      type: Number,
      default: 4
    }
  },
  

  data () {
    return {
      isFocus: false,
      isLocked: false,
      filteredOptions: [],
      popperInstance: null,
    };
  },

  computed: {
    inputProps() {
      const props = {
        ...this.$attrs,
        value: this.value.value,
        id: this.id
      };

      if (this.maxLength) {
        props.maxlength = this.maxLength;
      }

      if (this.showPassword) {
        props.type = "text";
      }

      return props;
    },
    inputEvents() {
      return {
        ...this.$listeners,
        input: this.onInput,
        focus: this.onFocus,
        blur: this.onBlur,
        change: this.onChange
      };
    }
  },

  mounted () {
    this.filteredOptions = []; // Need to geolocate user to prefill options
    this.createPopper();
  },

  beforeDestroy() {
    this.destroyPopper();
  },

  methods: {
    focus() {
      this.$refs.input.focus();
    },

    onFocus(e) {
      this.$emit("focus", e);
      this.isFocus = true;
    },

    onInput(e) {
      this.$emit("input", { id: -1, value: e.target.value });

      if (e.target.value.length >= this.suggestionFromLength) {
        this.filteredOptions = this.options.filter((option) => {
          return option.value, option.value.toLowerCase().includes(e.target.value.toLowerCase());
        });
        this.popperInstance.update();
      } else {
        this.filteredOptions = [];
        this.popperInstance.update();
      }
    },

    onBlur(e) {
      this.$emit("blur", e);
      this.isFocus = false;
    },

    onChange(value) {
      this.$emit("change", value);
    },

    setValueFromOption(option) {
      this.$emit("input", {id: option.id, value: option.value });
      this.filteredOptions = [];
      this.popperInstance.update();
      this.isLocked = true;
    },

    clear () {
      this.$emit("input", { id: -1, value: '' });
      this.isLocked = false;
      this.$refs.input.focus();
    },

    createPopper() {
      this.popperInstance = createPopper(this.$el, this.$refs.suggestions, {
        placement: 'bottom'
      });
    },

    destroyPopper() {
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    }
  }
};
</script>

<template>
  <div
    class="autocomplete"
    :class="{
      'autocomplete--has-error': hasError,
      'autocomplete--has-icon': icon,
      'autocomplete--has-length': maxLength,
      'autocomplete--has-prefix': prefix,
      'autocomplete--is-focus': isFocus
    }"
  >
    <span v-if="prefix" class="autocomplete__prefix">{{ prefix }}</span>

    <div class="autocomplete__input-wrapper">
      <span v-if="icon" class="autocomplete__icon"><Icon :name="icon" /></span>
      <input
        ref="input"
        v-bind="inputProps"
        v-on="inputEvents"
        class="autocomplete__input"
      />

      <!-- Max length indicator -->
      <span v-if="maxLength" class="autocomplete__length">
        <strong>{{ value ? value.length : 0 }}</strong
        >/{{ maxLength }}
      </span>

      <span v-if="isLocked || value.id !== -1" class="autocomplete__locker">
        <a href="#" @click="clear"><Icon name="close" /></a>
      </span>

      <div v-show="filteredOptions.length" class="autocomplete__options" ref="suggestions">
        <ul>
          <li
            v-for="(option, index) in filteredOptions"
            :key="index"
          >
            <a href="#" @click="setValueFromOption(option)">{{ option.value }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$input-height: 40px;
$input-length-width: 52px;

.select {
  display: inline-flex;
  vertical-align: middle;
}

.autocomplete__input-wrapper {
  position: relative;
  width: 100%;
}

.autocomplete__input {
  width: 100%;
  height: $input-height;
  line-height: $input-height;
  outline: none;
  padding: 0 space(2);
  border: 1px solid color(grey-light);
  border-radius: 5px;
  color: color(black-light);
  background-color: color(grey-lighter);
  transition: all 0.3s ease;

  &[disabled] {
    opacity: 0.3;
    cursor: not-allowed;
    background-color: inherit;
  }

  .autocomplete--is-focus & {
    border-color: color(grey-light);
    box-shadow: 2px 2px 0 #D8D9DF;
    background-color: color(white);
  }

  .autocomplete--has-error & {
    box-shadow: 2px 2px 0 scale-color(color(danger), $lightness: 50%);
  }

  .autocomplete--has-icon & {
    padding-left: $input-height;
  }

  .autocomplete--has-length & {
    padding-right: $input-length-width;
  }

  .autocomplete--has-prefix & {
    border-radius: 0 5px 5px 0;
  }
}

.autocomplete__icon {
  height: $input-height;
  width: $input-height;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  transition: color 0.3s ease;

  .icon {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .autocomplete--is-focus & {
    color: color(black-light);
  }
}

.autocomplete__length {
  height: $input-height;
  width: $input-length-width;
  line-height: $input-height;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
}

.autocomplete__prefix {
  height: $input-height;
  line-height: $input-height;
  padding: 0 space(2);
  border-radius: 5px 0 0 5px;
  background-color: color(grey-lighter);
}

.autocomplete__options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
  background: white;
  border: 1px solid color(grey-light);
  box-shadow: 2px 2px 5px rgba(0,0,0,.1);
  border-radius: 0 0 5px 5px;

  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    display: block;
    text-decoration: none;
    padding: 10px;
    color: color(black-light);
    font-weight: bold;

    &:hover {
      background-color: color(grey-lighter);
      color: color(primary);
    }
  }
}

.autocomplete__locker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
}
</style>
