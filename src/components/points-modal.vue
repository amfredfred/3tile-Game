<template>
    <div class="earned-points-container">
        <!-- <img :src="IconCoin" alt="" class="icon"> -->
        <div class="points-container">
            <v-progress-circular size="30" v-if="!points" style="margin-left:auto" color="info" indeterminate />
            <span class="points" v-else>{{ formatNumber(Number(points || 0)) }}</span>
            <strong class="account-denomination"> {{ currency }}</strong>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useMainStore } from '@/stores/mainstore';
import { formatNumber } from '@/utils';
import { useWebSocketStore } from '@/stores/websocket';

const _store = useMainStore();
const points = computed(() => _store?.overview?.totalScore);
const currency = computed(() => _store?.admin_settings?.GLOBAL_CONFIG?.app_short_name)
console.log(_store?.admin_settings)
const socket = useWebSocketStore()
onMounted(() => socket.sendMessage('account-overview'));

</script>

<style scoped>
.points-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* padding-inline: 1rem; */
    /* gap: .5rem; */
    font-family: Lato-Bold;
}

.earned-points-container .icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 80px;
    pointer-events: none;
    z-index: -1;
}

.earned-points-container {
    flex-grow: 1;
    border-radius: 0;
    /* background: var(--container-bg); */
    background: transparent;
    border: none;
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    isolation: isolate;
    overflow: hidden;
    padding: 0
}

.earned-points-container::after {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    content: '';
    width: 100%;
    height: 110%;
    aspect-ratio: 1;
    z-index: -1;
    overflow: hidden;
}

.points {
    font-weight: 900;
    font-size: 1.6rem;
    height: 100%;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: auto;
    text-shadow: 0 0 3px pink;
}

.account-denomination {
    font-weight: 900;
        font-size: 1.6rem;
    color: rgb(239, 251, 179);
}
</style>