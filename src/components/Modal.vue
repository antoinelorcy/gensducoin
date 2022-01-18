<script>
export default {
  props: {
    visible: Boolean,
    title: {
		type: String,
		required: true
	},
    hasClose: {
      type: Boolean,
      default: true
    },
    isAppendToBody: Boolean
  },

  mounted () {
	  this.$watch('visible', (bool) => {
      const bodySrollLockedClassname = 'body--is-scroll-locked';
		  if( bool) {
			  document.body.classList.add(bodySrollLockedClassname);
		  } else {
        document.body.classList.remove(bodySrollLockedClassname);
      }
	  }, { immediate: true })
  },

  methods: {}
};
</script>

<template>
  <transition name="modal-transition">
    <div v-if="visible" class="modal m">
      <div class="m__overlay" @click="$emit('close')"></div>
      <div class="m__modal">
        <Button
            icon="close"
            fill="raw"
            class="m__modal__close"
            @click="$emit('close')"
          />
        <div class="m__modal__content">
			      <h1 class="m__modal__title">{{ title }}</h1>
          	<slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding-top: 80px;
  z-index: 100;
  
  @include breakpoint(mobile) {
    padding-top: 0;
  }
}

.m__overlay {
  background-color: rgba(color(black), 0.7);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.m__modal {
  @include overflow(vertical);

  max-width: 90%;
  max-height: 100%;
  width: 600px;
  background: color(white);
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;


  @include breakpoint(mobile) {
    max-width: 100%;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
}

.m__modal__close {
 position: absolute;
 top: 0;
 right: 0;
 margin: space(3);
}

.m__modal__title {
	margin-top: space(3);
	padding-right: space(6);
}

.m__modal__content {
  padding: space(6);
  flex: 1;
  overflow: hidden;

  @include breakpoint(mobile) {
    @include overflow(vertical);
  }
}

.modal-transition-enter-active {
  animation: fade-in 0.3s ease;

  .m__modal {
    animation: from-top 0.3s ease;
  }
}
.modal-transition-leave-active {
  animation: fade-in 0.3s ease reverse;

  .m__modal {
    animation: from-top 0.3s ease reverse;
  }
}

@keyframes from-top {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
