<template>
    <div class="farming-inner-container">
        <div class="farm-data-display  neon-apply neon-purple">
            <v-progress-circular style="color: black;"
                :model-value="(farmData.waitedTime / farmData.waitTimeRequired) * 100" :rotate="360" :size="80"
                :width="15">
                <v-progress-circular style="color: #F44F5A;" size="100" width="10" v-if="farmData.isLoading"
                    indeterminate />
            </v-progress-circular>
        </div>

        <div class="indicator-wrapper">
            <v-button @click.stop="farmingButtonAction" :class="['farming-button']" :style="buttonStyle()">
                <div class="farming-indicator">
                    <v-progress-circular size="16" v-if="farmData.isLoading" style="margin-left:auto" color="info"
                        indeterminate />
                    <strong v-else>{{ buttonText() }}</strong>
                    <strong style="opacity: .5;">&nbsp;{{ farmingReward }}MEP </strong>
                </div>
                <span v-if="farmingEra?.is_farming">{{ formattedCountdown }}</span>
            </v-button>

            <v-confetti v-if="farmData.isConfettiShown" />
        </div>

        <v-bottom-sheet :absolute="true" v-model="farmData.isButtonsheetOpen">
            <div class="bottom-sheet-container power_string">
                <img :src="AlramClock" alt="" class="image-small">
                <h1 style="font-weight: 900;">Coming Soon</h1>
                <p style="text-align: center;">
                    Extend your farming era by 1Hr. You will be able to continue farming and earn
                    more rewards.
                </p>
                <v-button disabled :class="['farming-button button-round ']">
                    <strong class="">Extend ERA</strong>
                </v-button>
            </div>
        </v-bottom-sheet>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useMainStore } from '@/stores/mainstore';
import { useWebSocketStore } from '@/stores/websocket';
import { getActualCountdown } from '@/utils';
import AlramClock from '@/assets/icons/alarm-clock.png'

const farmData = reactive({
    waitTimeRequired: 600,
    waitedTime: 0,
    isLoading: false,
    isFarming: false,
    isButtonsheetOpen: false,

    isConfettiShown: false
})

const _store = useMainStore()
const farmingEra = computed(() => _store.farmingEra)
const farmingReward = computed(() => _store?.farmingEra?.claimable_reward)

const buttonText = () => {
    if (farmData.isLoading) return "Loading..."
    if (farmingEra.value?.is_ended) return "CLAIM"
    if (farmingEra.value?.is_farming) return "FARMED"
}

const buttonStyle = () => {
    if (farmData.isLoading) return { background: '#478778' }
    if (farmingEra?.value?.is_ended) return { background: '#004526' }
    if (farmingEra?.value?.is_farming) return { background: '#097969' }
}

const farmingButtonAction = async () => {
    if (!farmingEra.value) {
        await syncFarmingEra('createEra')
    } else if (farmingEra?.value?.is_ended) {
        await syncFarmingEra('harvestEra')

        farmData.isConfettiShown = true
    } else {
        farmData.isButtonsheetOpen = true
    }
}

const formattedCountdown = computed(() => getActualCountdown(farmingEra.value!.remainingTime!.left_timestamp + Date.now()));
const socket = useWebSocketStore()

const syncFarmingEra = async (action: 'activeEra' | 'createEra' | 'harvestEra' = 'activeEra') => {
    if (farmData.isLoading) return
    farmData.isLoading = true
    farmData.isFarming = false
    socket.sendMessage('farming', { session_id: farmingEra?.value?.session_id }, action);
    await promise()
    farmData.isLoading = false
    farmData.isFarming = true
}

const promise = () => new Promise((resolved) => setTimeout(resolved, 600))
onMounted(async () => {
    await syncFarmingEra()
})
</script>

<style scoped>
.farming-inner-container {
    background: transparent;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: auto;
}

.farm-data-display {
    margin-bottom: 1.5rem;
    gap: .5rem;
    border-radius: 10px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    background: rgba(29, 31, 31, 0.5);
    box-shadow: none;
    border: none;
    width: 100%;
    padding: 1rem;
    background: #0f0f10;
}

.indicator-wrapper {
    display: flex;
    gap: 1rem;
    width: 100%;
}

.farming-button {
    border: none;
    box-shadow: none;
    padding: 1.3rem 1rem;
    border-radius: 10px;
    color: white;
    background: rgb(17, 31, 31);
    gap: .5rem;
    align-items: center;
    justify-content: space-between;
    font-size: 1em;
    flex-grow: 1;
}



.farming-button strong,
.farming-button span {
    font-weight: 500
}

.farm-data-shown {
    display: flex;
    align-items: center;
    padding: 1rem;
}

.farm-data-shown strong {
    font-weight: 900;
    font-size: 2.4em;
    height: 100%;
    color: white;
}

.farming-button::after {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    content: '';
    font-weight: 900;
    text-shadow: 0 0 1px rgb(43, 49, 58);
    font-size: 1.1rem;
    width: 70px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    pointer-events: none;
    text-transform: uppercase;
}


.farming-button::before {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    content: '';
    font-weight: 900;
    font-size: .8rem;
    z-index: 1;
    opacity: .1;
    pointer-events: none;
    text-transform: uppercase;
    background: red;
}

.farming-button .icon {
    width: 25px;
}
</style>