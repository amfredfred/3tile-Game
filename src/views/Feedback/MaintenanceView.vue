<template>
    <v-container>
        <screen-heading heading="Maintenance Mode" />
        <v-card-text>
            We are currently undergoing maintenance.<br />Please check back later.
        </v-card-text>
        <v-card-title class="headline"></v-card-title>

        <v-card-actions>
            <v-btn :disabled="isReloading" class=" button-round farming-button" @click="onReloadClick">
                <v-progress-circular size="25" v-if="isReloading" indeterminate />
                <span v-else>Refresh</span>
            </v-btn>
        </v-card-actions>
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
const onReloadClick = () => emits('reload')
</script>

<style scoped>
.v-container {
    margin-block: auto;
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.v-card-actions {
    width: 100%;
}

.v-card-actions .button-round {
    cursor: pointer;
    background: darkgreen;
}
</style>
