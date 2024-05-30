<template>
    <v-button class="points-container">
        <div :key="motionKey" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, scale: 1 }"
            :variants="{ custom: { scale: 2 } }" :hovered="{ scale: 1.2 }" :delay="10" :duration="1200">
            <img class="icon" :src="coinIcon" alt="Coin Icon">
        </div>
        <v-progress-circular size="25" v-if="!points" color="warning" indeterminate />
        <v-number v-else class="points" :from="0" :to="Number(points).toFixed()" :duration=".1" autoplay easing="linear" />
    </v-button>
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
    padding: 10px 8px;
    background: transparent;
    border-radius: 50px;
    border: none;
}

.points {
    font-weight: 900;
    padding-bottom: 5px;
    max-width: 100px;
    font-size: 200%;
}


.v-motion-enter-active,
.v-motion-leave-active {
    transition: all 0.6s;
}
</style>