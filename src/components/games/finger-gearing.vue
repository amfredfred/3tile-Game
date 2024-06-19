<template>
    <div id="game-container">
        <vue-speedometer :value="rpmPercent" needleTransition="easeElastic" :needleTransitionDuration="3333"
            :currentValueText="`RPM - ${rpm}`" :maxSegmentLabels="0" :segments="4" needleColor="#D8DEE9" />

        <v-button @mousedown="startCounting" @mouseleave="stopCounting" :class="['farming-button', 'button-round']">
            <strong>Place your finger here</strong>
        </v-button>

        <div id="bonus">Engine RPM: {{ rpm }}</div>
        <div id="gear-level">Gear: {{ gears }}</div>
        <div id="speed">Speed (Mph): {{ speed }}</div>
        <div id="points">Points: {{ points }}</div>

        <v-bottom-sheet :absolute="true" v-model="wh.isBottomSheetVisible">
            <div class="bottom-sheet-container power_string">
                <h1 style="font-weight: 900;">Congrats 🎉🎉</h1>
                <p style="text-align: center;">{{ points }}</p>
                <v-button @click="claimReward" :class="['farming-button', 'button-round']">
                    <strong>CLAIM REWARD</strong>
                </v-button>
            </div>
        </v-bottom-sheet>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import VueSpeedometer from "vue-speedometer";

const rpm = ref(0);
const gears = ref(1);
const points = ref('0');
const interval = ref<number | null>(null);
const maxRPM = 1000; // Maximum RPM before gear shifts
const minRPM = 10; // Minimum RPM after gear shift
const maxTotalRPM = 20000; // Maximum total RPM allowed

const rpmPercent = ref(0)

const wh = reactive({
    isBottomSheetVisible: false
});

// Compute the speed (Mph) based on RPM and gear
const speed = computed(() => {
    return ((rpm.value / 100) * gears.value).toFixed(2);
});

// Compute points based on speed
const updatePoints = () => {
    points.value = speed.value;
}

const startCounting = () => {
    console.log('Engine started');
    if (interval.value) return; // Prevent multiple intervals

    interval.value = setInterval(() => {
        if (rpm.value >= maxTotalRPM) {
            stopCounting();
            return;
        }
        if (rpm.value >= maxRPM && gears.value < 7) {
            gears.value++;
            rpm.value = minRPM; // Reset RPM after gear shift
        } else {
            rpm.value += 10; // Increase RPM
            rpmPercent.value = (rpm.value * maxTotalRPM) / 100
            console.log(rpmPercent.value)
        }
        updatePoints(); // Update points based on current speed
    }, 20); // Increase RPM every 20 milliseconds
}

const stopCounting = () => {
    console.log('Engine stopped');
    if (interval.value) clearInterval(interval.value);
    interval.value = null;
    // wh.isBottomSheetVisible = true; // Uncomment if you want to show the bottom sheet when engine stops
}

const claimReward = () => {
    wh.isBottomSheetVisible = false;
    rpm.value = 0;
    gears.value = 1;
    points.value = '0';
    console.log('Claimed Points');
}
</script>

<style scoped>
#game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: var(--container-bg);
    width: 100%;
    border-radius: 20px;
    min-height: max-content;
    padding-inline: 1rem;
}

#bonus,
#gear-level,
#speed,
#points {
    font-size: 24px;
    margin: 10px 0;
}
</style>
