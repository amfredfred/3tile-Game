<template>
    <div class="points-container">
        <img class="icon"   :src="coinIcon" alt="Coin Icon">
        <v-progress-circular size="25" v-if="!points" color="warning" indeterminate />
        <span class="points">{{ Number(points).toFixed() }}</span>
    </div>
</template>



<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import coinIcon from '@/assets/icons/coin-icon.png';
import { useMainStore } from '@/stores/mainstore';


const _store = useMainStore()

const points = computed(() => _store?.overview?.totalScore)

// Reactive key to trigger re-rendering
const motionKey = ref(0);

// Watch for changes in points and update the key to trigger animation
watch(() => points.value, () => {
    motionKey.value++;
});
</script>



<style scoped>
.points-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.points {
    font-weight: 900;
    font-size: 1.4em;
    height: 100%;
    color: white;
}

</style>