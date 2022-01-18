<template>
    <div class="step" ref="step">
        <h2 class="step__title">{{ title }}</h2>
        <div class="step__content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

<style lang="scss" scoped>
.step {
    &__title {
        margin-bottom: space(5);
    }
}
</style>