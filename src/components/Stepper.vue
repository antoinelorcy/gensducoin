<template>
    <Form class="stepper" @submit="$emit('submit')">
        <ul v-if="!$store.state.isSmallWindow" class="stepper__bullets">
            <li
                v-for="(step, index) in steps"
                :key="index"
                class="stepper__bullet"
                :class="{'stepper__bullet--active': (index + 1) === value}"
            >
                <span class="stepper__bullet-index">{{ index + 1 }}</span>
                <span class="stepper__bullet-label">{{ step.label }}</span>
            </li>
        </ul>
        <transition name="stepper-transition">
            <div :key="value" class="stepper__content">
                <div class="stepper__steps">
                    <slot />
                </div>
                <div class="stepper__nav">
                    <div>
                        <Button
                            v-if="value > 1"
                            label="Précédent"
                            color="grey"
                            fill="raw"
                            type="button"
                            @click.stop="$emit('prev')"
                        />
                    </div>
                    <div>
                        <Button
                            :label="value < steps.length ? 'Suivant' : 'Envoyer'"
                            :is-loading="isSubmitting"
                            type="submit"
                        />
                    </div>
                </div>
            </div>
        </transition>
    </Form>
</template>

<script>
import Form from '~/components/Form';

export default {  
    props: {
        steps: Array,
        value: Number,
        isSubmitting: Boolean
    },

    components: {
        Form
    }
}
</script>

<style lang="scss" scoped>
.stepper {
    padding: 10px;

    &__bullets {
        padding: 0;
        list-style: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid color(grey-lighter);
        padding-bottom: 20px;
        margin-bottom: space(2);   
    }

    &__bullet {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: color(grey);
        transition: all 0.3 ease;

        &:not(:last-child):after {
            content: '\203A';
            display: block;
            width: 20px;
            text-align: center;
            margin: 0 10px;
        }

        &-index {
            width: 22px;
            height: 22px;
            background: color(grey-lighter);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            margin-right: space(2);
            line-height: 1;
        }

        &--active {
            .stepper__bullet-index {
                background-color: color(primary);
                color: white;
            }

            .stepper__bullet-label {
                color: color(primary);
                font-weight: bold;
            }
        }
    }

    &__content {
        max-width: 500px;
        padding: 20px 0;
    }

    &__nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 40px;
    }
}

.stepper-transition-enter-active {
  animation: from-right 0.3s ease;
}

@keyframes from-right {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>