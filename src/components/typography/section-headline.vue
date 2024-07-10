<template>
    <div>
        <h2 class="section-heading">{{ props.title }}</h2>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    title: {
        type: String
    }
})

</script>

<style scoped>
.section-heading{
    font-size: 2rem;
    font-weight: bolder;
}
</style>