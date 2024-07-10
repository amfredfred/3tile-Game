<template>
    <div>
        <p class="section-sub-headline">{{ props.subheadline }}</p>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    subheadline: {
        type: String
    }
})
</script>

<style scoped>
.section-sub-headline {
    font-size: .8rem;
    text-align: center;
    line-height: 1.4;
    margin-inline: auto;
    flex-grow: 1;
}
</style>