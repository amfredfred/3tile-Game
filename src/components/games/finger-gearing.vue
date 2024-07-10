<template>
    <div id="game-container">
        {{ nextGearChangeRPM }}
        <div class="gear-indicator">
            * <strong><span style="color: green;">{{ gears }}</span>/{{ maxGears }}</strong>
        </div>
        <!-- <div class="next-gear-indicator">
            Next Gear IN <strong style="color: green;">{{ nextGearChangeRPM }}</strong>RPM
        </div> -->
        <div class="mph-indicator">
            <strong style="color: orangered;">{{ speed }}</strong>
        </div>

        <vue-speedometer class="speedeometer" :value="rpmPercent" needleTransition="easeElastic"
            :needleTransitionDuration="3333" :currentValueText="`RPM - ${rpm} OF ${maxTotalRPM}`" :maxSegmentLabels="0"
            :segments="70" needleColor="#D8DEE9" />

        <v-button :disabled="wh.isMoving" style="border-radius: 5px !important;" @mousedown="startCounting"
            :class="['farming-button', 'button-round']">
            <!-- {{ wh.isMoving ? `Take ${points} MEP` : 'PRESSS HERE (soon)' }} -->
            SOON
        </v-button>


        <v-bottom-sheet :absolute="true" v-model="wh.isBottomSheetVisible">
            <div class="bottom-sheet-container power_string">
                <!-- <h1 style="font-weight: 900;">AWESOME YOU</h1> -->
                <p style="text-align: center;">You earned {{ points }} POINTS</p>
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
const interval = ref<any>(null);
const minRPM = 10; // Minimum RPM after gear shift
const maxTotalRPM = 20000; // Maximum total RPM allowed
const randomRPM = [maxTotalRPM / 2, maxTotalRPM / 3, maxTotalRPM / 4, maxTotalRPM / 5, maxTotalRPM / 1.5, maxTotalRPM / 1.3]
const rpmPercent = ref(0)
const maxGears = 20
const nextGearChangeRPM = ref(maxTotalRPM / 4)


const wh = reactive({
    isBottomSheetVisible: false,
    isMoving:false //false
});

const speed = computed(() => {
    return ((rpm.value / 100) * gears.value).toFixed(2);
});

const updatePoints = () => {
    points.value = speed.value;
}

const startCounting = () => {
    if (interval.value) return;
    if (Number(points.value) > 0) return wh.isBottomSheetVisible = true
    wh.isMoving = true
    interval.value = setInterval(() => {
        if (rpm.value >= maxTotalRPM) {
            stopCounting();
            return;
        }
        const item_index = Math.floor(randomRPM.length * Math.random())
        if (rpm.value >= nextGearChangeRPM.value && gears.value < maxGears) {
            gears.value++;
            nextGearChangeRPM.value = Math.floor(randomRPM[item_index])
            rpm.value = minRPM;
        } else {
            rpm.value += 5;
            rpmPercent.value = ((rpm.value * 100) / maxTotalRPM) * 10
        }
        updatePoints();
    }, 5);
}

const stopCounting = () => {
    if (!wh.isMoving) return
    wh.isMoving = false
    if (interval.value) clearInterval(interval.value);
    interval.value = null;
    wh.isBottomSheetVisible = true;
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
    background: black;
    width: 100%;
    border-radius: 20px;
    min-height: max-content;
    padding-top: 5rem;
    position: relative;
    isolation: isolate;
    color: white;
    /* overflow: hidden; */

    padding:1rem
}

.speedeometer {
    height: 180px;
}

.gear-indicator,
.mph-indicator,
.next-gear-indicator {
    position: absolute;
    left: 5px;
    bottom: 63px;
    border-radius: 50px;
    padding: .1rem .6rem;
    display: flex;
    align-items: center;
    gap: .3rem;
}



.mph-indicator {
    left: auto;
    right: 5px;
}
</style>
