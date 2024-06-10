<template>
    <div class="heading-container">
        <h3 v-if="title" class="sccreen-title">
            {{ title }}
        </h3>
        <h1 v-if="heading" class="screen-heading">
            {{ heading }}
        </h1>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String
    },
    heading: {
        type: String
    }
})
</script>


<style scoped>
.heading-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: whitesmoke;
    font-family: Jaro;

}

.sccreen-title {
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1rem;
}

.screen-heading {
    text-transform: uppercase;
    font-weight: 900;
    font-size: 2rem;
}
</style>