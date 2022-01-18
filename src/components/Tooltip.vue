<script>
import { createPopper } from "@popperjs/core";

export default {
  props: {
    content: String,
    /**
     *  "auto" | "auto-start" | "auto-end" | "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "right" | "right-start" | "right-end" | "left" | "left-start" | "left-end"
     */
    placement: {
      type: String,
      default: "top"
    }
  },

  data() {
    return {
      popperInstance: null,
      isVisible: false
    };
  },

  mounted() {
    this.createPopper();
  },

  beforeDestroy() {
    this.destroyPopper();
  },

  methods: {
    show() {
      this.isVisible = true;
      this.popperInstance.update();
    },

    hide() {
      this.isVisible = false;
    },

    createPopper() {
      this.popperInstance = createPopper(this.$el, this.$refs.tooltip, {
        placement: this.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8]
            }
          }
        ]
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
  <div class="tooltip" @mouseenter="show" @mouseleave="hide">
    <slot></slot>
    <transition name="tooltip">
      <div v-show="isVisible" class="tooltip__tooltip" ref="tooltip">
        <div class="tooltip__arrow" data-popper-arrow></div>
        <div v-if="$slots.content"><slot name="content"></slot></div>
        <div else>{{ content }}</div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
$tooltip-bgcolor: color(black-light);

.tooltip {
  display: inline-flex;
}

.tooltip__tooltip {
  background: $tooltip-bgcolor;
  color: color(white);
  padding: space(2);
  border-radius: 5px;
  font-size: 12px;
}

.tooltip__arrow,
.tooltip__arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  z-index: -1;
}

.tooltip__arrow::before {
  content: "";
  transform: rotate(45deg);
  background: $tooltip-bgcolor;
}

.tooltip__tooltip[data-popper-placement^="top"] > .tooltip__arrow {
  bottom: -4px;
}

.tooltip__tooltip[data-popper-placement^="bottom"] > .tooltip__arrow {
  top: -4px;
}

.tooltip__tooltip[data-popper-placement^="left"] > .tooltip__arrow {
  right: -4px;
}

.tooltip__tooltip[data-popper-placement^="right"] > .tooltip__arrow {
  left: -4px;
}

.tooltip-enter-active {
  transition: opacity 0.3s ease;
}

.tooltip-enter,
.tooltip-leave-to {
  opacity: 0;
}

.tooltip-leave-active {
  display: none;
}
</style>
