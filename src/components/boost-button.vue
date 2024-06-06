<template>
    <div class="frens-button-container">
        <v-button class="frens-button " @click.stop="fetchFrensAndRewards">
            <v-progress-circular size="25" v-if="frensData.isFetching" indeterminate />
            <img :src="ThrusterIcon" v-else alt="" class="icon">
            <strong>Boost</strong><span class="pi pi-arrows-v"></span>
        </v-button>

        <v-bottom-sheet :absolute="true" v-model="frensData.isButtonsheetOpen">

        </v-bottom-sheet>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import ThrusterIcon from '@/assets/icons/thruster-icon.png'

const frensData = reactive({
    isButtonsheetOpen: false,
    isFetching: false
})


const fetchFrensAndRewards = async () => {
    frensData.isFetching = true
    await promise()
    frensData.isFetching = false
}

const promise = () => new Promise((resolved) => setTimeout(resolved, 3000))
</script>

<style scoped>
.frens-button-container {
    background: var(--neon);
    border-radius: 5px;
    border: none;
}

.frens-button {
    border-radius: inherit;
    display: flex;
    gap: .6rem;
    box-shadow: none;
    border: inherit;
    background: inherit;
    width: 100%;
    padding: 1rem;
}

.frens-button .icon {
    width: 25px;
}
</style>