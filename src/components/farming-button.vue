<template>
    <div class="farming-inner-container">
        <div class="farm-data-display">
            <v-button :disabled="farmData.isFarming" :data-content="farmData.sessionBalance" :data-status="farmData.farmSataus" class="farming-button"
                :style="{ background: `url(${farmData.isFarming ? CoinIconGiF : SatrtIcon})` }">
                <v-progress-circular style="color: #43650F;" @click.stop="startFarmingEra"
                    :model-value="farmData.sessionBalance / 100" :rotate="360" :size="200" :width="15">
                    <v-progress-circular style="color: #F44F5A;" size="100" width="10" v-if="farmData.isLoading"
                        indeterminate />
                </v-progress-circular>
            </v-button>
        </div>
        <div class="farm-data-shown">
            <img style="width: 2.5rem;" :src="CoinIcon" class="icon">
            <strong> {{ farmData.sessionBalance }}</strong>
        </div>
        <v-bottom-sheet :absolute="true" v-model="farmData.isButtonsheetOpen">

        </v-bottom-sheet>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import CoinIcon from '@/assets/icons/coin-icon.png'
import CoinIconGiF from '@/assets/icons/gif-coin.gif'
import SatrtIcon from '@/assets/icons/icons-start-96.png'


const farmData = reactive({
    balance: 0,
    sessionEnd: 0,
    sessionStart: 0,
    sessionBalance: 0,
    isLoading: false,
    isFarming: false,
    isButtonsheetOpen: false,
})

const startFarmingEra = async () => {
    farmData.isLoading = true
    farmData.isFarming = false
    await promise()
    setInterval(() => {
        farmData.sessionBalance += 100
    }, 1000)
    farmData.isLoading = false
    farmData.isFarming = true

}

const promise = () => new Promise((resolved) => setTimeout(resolved, 3000))

</script>

<style scoped>
.farming-inner-container {
    background: transparent;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.farm-data-display {
    margin-top: 1.5rem;
    display: flex;
    gap: .5rem;
    border-radius: 50%;
    overflow: hidden;
    align-items: center;
    background: linear-gradient(to top left, #F44F5A, #FCC419, #FA5252);
}

.farming-button {
    border: inherit;
    box-shadow: none;
    padding: 0;
    aspect-ratio: 1;
    border-radius: 50%;
    background-repeat: no-repeat !important;
    background-position: center !important;
}

.farm-data-shown {
    display: flex;
    align-items: center;
    padding: 1rem;
}

.farm-data-shown strong {
    font-weight: 900;
    font-size:2.4em;
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