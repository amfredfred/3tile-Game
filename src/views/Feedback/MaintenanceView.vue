<template>
    <v-container>
        <screen-heading heading="Maintenance Mode" />
        <v-section-subheadline subheadline="We are currently undergoing maintenance." />
        <v-section-subheadline subheadline="Please check back later. " />
        <v-card-title class="headline"></v-card-title>


        <!-- <v-card-actions>
            <v-btn :disabled="isReloading" class=" button-round farming-button" @click="onReloadClick">
                <v-progress-circular size="25" v-if="isReloading" indeterminate />
                <strong v-else>Reload</strong>
            </v-btn>
        </v-card-actions> -->
    </v-container>
</template>

<script setup lang="ts">

defineProps({
    isReloading: {
        type: Boolean,
        required: true
    }
})

const emits = defineEmits(['reload'])
// const onReloadClick = () => emits('reload')
</script>

<style scoped>
.v-container {
    margin-block: auto;
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    text-align: center;
    display: grid;
    place-content: center;
    place-items: center;
    height: 100%;

    background-size: contain !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
}

.v-container::after {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    backdrop-filter: blur(200px);
    content: '';
    z-index: -1;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top left, rgba(255, 0, 0, 0.05), rgba(0, 0, 0, 0.02));
}

.v-card-actions {
    width: 100%;
}

.v-card-actions .button-round {
    cursor: pointer;
    background: rgb(19, 19, 19);
}
</style>
