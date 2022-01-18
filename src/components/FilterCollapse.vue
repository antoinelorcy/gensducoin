<template>
    <div class="filter-collapse" :class="{'filter-collapse--collapsed': isCollapsed}">
        <div class="filter-collapse__content">
            <slot />
        </div>
        <div class="filter-collapse__show-more" v-if="isCollapsed">
            <Button @click="isCollapsed = false" :label="showMoreLabel" fill="raw" /> 
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showMoreLabel: {
            type: String,
            default: 'Afficher tout'
        }
    },

    data () {
        return {
            isCollapsed: true
        }
    }
}
</script>

<style lang="scss" scoped>
.filter-collapse {
    &--collapsed &__content {
        height: 250px;
        overflow: hidden;
        
        &:before {
            content: '';
            background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%, rgba(255,255,255,1) 100%);
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 40px;
            z-index: 1;
        }
    }

    &__content {
        height: auto;
        position: relative;
    }

    &__show-more {
        text-align: center;
    }
}
</style>