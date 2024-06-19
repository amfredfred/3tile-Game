<template>
    <div class="farming-inner-container">
        <div class="indicator-wrapper">
            <v-button @click.stop="farmingButtonAction" :class="['farming-button button-round']" :style="buttonStyle()">
                <div class="farming-indicator">
                    <v-progress-circular size="16" v-if="farmData.isLoading" style="margin-left:auto" color="info"
                        indeterminate />
                    <strong style="opacity: .5;" v-else>{{ buttonText() }}</strong>
                    <strong style="opacity: .5;">&nbsp;{{ farmingReward }}MEP </strong>
                </div>
                <span style="opacity: .5;" v-if="farmingEra?.is_farming">{{ formattedCountdown }}</span>
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
    if (farmingEra.value?.is_ended) return "Claim"
    if (farmingEra.value?.is_farming) return "Farming"
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


.indicator-wrapper {
    display: flex;
    gap: 1rem;
    width: 100%;
    overflow: hidden;
}
</style>