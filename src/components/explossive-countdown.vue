<template>
    <v-button class="countdown-container">
        <div :key="motionKey" v-motion :initial="{ opacity: 0, scale: [1, 1.2, 1.4, 1.6, 1.8, 2, 4, 6, 8, 10] }"
            :enter="{ opacity: 1, scale: 1 }" :variants="{ custom: { scale: 2 } }" :hovered="{ scale: 1.2 }" :delay="10"
            :duration="1200" class="countdown neon-white neon-apply">
            <v-progress-circular :model-value="countdown" :rotate="360" :size="100" :width="15" color="green">
                {{ countdown }}
            </v-progress-circular>
        </div>
    </v-button>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
// Define props
const props = defineProps({
    countdown: {
        type: Number,
        default: 10,
    }
});

// Reactive key to trigger re-rendering
const motionKey = ref(0);

// Watch for changes in countdown and update the key to trigger animation
watch(() => props.countdown, () => {
    motionKey.value++;
});
</script>



<style scoped>
.countdown-container {
    background: transparent;
    border: none;

    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    z-index: 10;

    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 54;
}

.countdown-container::before {
    position: fixed;
    left: 0;
    top: 0;
    content: '';
    height: 100vh;
    width: 100vw;
    backdrop-filter: grayscale(.5);
}

.countdown {
    font-weight: 900;
    font-size: 2rem;
    padding: 20px;
    border-radius: 100px;
    border: none;
}


.v-motion-enter-active,
.v-motion-leave-active {
    transition: all 0.6s;
}
</style>