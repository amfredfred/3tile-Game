<template>
    <div class="earned-points-container">
        <img :src="IconCoin" alt="" class="icon">
        <div class="points-container">
            <v-progress-circular size="30" v-if="!points" style="margin-left:auto" color="info" indeterminate />
            <span class="points" v-else>{{ formatNumber(Number(points || 0)) }}</span>
            <strong class="account-denomination">MEP</strong>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useMainStore } from '@/stores/mainstore';
import { formatNumber } from '@/utils';
import IconCoin from '@/assets/icons/coins.png';
import { useWebSocketStore } from '@/stores/websocket';

const _store = useMainStore();
const points = computed(() => _store?.overview?.totalScore);
const socket = useWebSocketStore()
onMounted(() => {
    socket.sendMessage('overview')
});
</script>

<style scoped>
.points-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-inline: 1rem;
    gap: .5rem;
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
    border-radius: 50px;
    background: linear-gradient(to top left, rgb(1, 47, 59), rgb(1, 65, 30));
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    isolation: isolate;
}

.earned-points-container::after {
    position: absolute;
    left: -50px;
    top: -50px;
    content: '';
    width: 100px;
    aspect-ratio: 1;
    z-index: -2;
    background: rgba(0, 0, 0);
}

.points {
    font-weight: 900;
    font-size: 2.1rem;
    height: 100%;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60%;
    margin-left: auto;
    text-shadow: 0 0 3px pink;
}

.account-denomination {
    font-weight: 900;
    font-size: 2.1rem;
    color: rgb(239, 251, 179);
}
</style>